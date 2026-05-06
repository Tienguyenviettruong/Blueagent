#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result as SqliteResult};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

// --- Data Models ---

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Agent {
    pub id: String,
    pub name: String,
    pub role: String,
    pub provider: String,
    pub creativity: f64,
    pub caution: f64,
    pub verbosity: f64,
    pub empathy: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Team {
    pub id: String,
    pub name: String,
    pub purpose: String,
    pub members: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DebateArgument {
    pub id: String,
    pub debate_id: String,
    pub author: String,
    pub claim: String,
    pub evidence: Vec<String>,
    pub strength: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct KnowledgeItem {
    pub id: String,
    pub title: String,
    pub content: String,
    pub tags: Vec<String>,
    pub confidence: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WorkflowNode {
    pub id: String,
    pub node_type: String,
    pub label: String,
    pub position: (f64, f64),
}

// --- Database Management ---

struct DbConnection(Mutex<Option<Connection>>);

fn init_db() -> SqliteResult<Connection> {
    let conn = Connection::open_in_memory()?;
    
    // Create schema
    conn.execute(
        "CREATE TABLE agents (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            provider TEXT NOT NULL,
            creativity REAL,
            caution REAL,
            verbosity REAL,
            empathy REAL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE teams (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            purpose TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE knowledge_items (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tags TEXT,
            confidence REAL DEFAULT 1.0
        )",
        [],
    )?;

    // Insert initial sample data
    conn.execute(
        "INSERT INTO agents (id, name, role, provider, creativity, caution, verbosity, empathy)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params!["agent-1", "Architect", "proposer", "openai", 0.8, 0.3, 0.6, 0.5],
    )?;

    conn.execute(
        "INSERT INTO agents (id, name, role, provider, creativity, caution, verbosity, empathy)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params!["agent-2", "Critic", "critic", "claude", 0.4, 0.9, 0.7, 0.3],
    )?;

    conn.execute(
        "INSERT INTO teams (id, name, purpose)
         VALUES (?1, ?2, ?3)",
        params!["team-1", "Product Development", "Develop new features"],
    )?;

    Ok(conn)
}

// --- Tauri Commands ---

#[tauri::command]
async fn get_agents(state: State<'_, DbConnection>) -> Result<Vec<Agent>, String> {
    let conn_guard = state.0.lock().unwrap();
    let conn = conn_guard.as_ref().ok_or("Database not initialized")?;

    let mut stmt = conn.prepare("SELECT id, name, role, provider, creativity, caution, verbosity, empathy FROM agents")
        .map_err(|e| e.to_string())?;

    let agents = stmt.query_map([], |row| {
        Ok(Agent {
            id: row.get(0)?,
            name: row.get(1)?,
            role: row.get(2)?,
            provider: row.get(3)?,
            creativity: row.get(4)?,
            caution: row.get(5)?,
            verbosity: row.get(6)?,
            empathy: row.get(7)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut result = Vec::new();
    for agent in agents {
        result.push(agent.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

#[tauri::command]
async fn create_agent(agent: Agent, state: State<'_, DbConnection>) -> Result<Agent, String> {
    let conn_guard = state.0.lock().unwrap();
    let conn = conn_guard.as_ref().ok_or("Database not initialized")?;

    conn.execute(
        "INSERT INTO agents (id, name, role, provider, creativity, caution, verbosity, empathy)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params![
            agent.id,
            agent.name,
            agent.role,
            agent.provider,
            agent.creativity,
            agent.caution,
            agent.verbosity,
            agent.empathy
        ],
    ).map_err(|e| e.to_string())?;

    Ok(agent)
}

#[tauri::command]
async fn get_teams(state: State<'_, DbConnection>) -> Result<Vec<Team>, String> {
    let conn_guard = state.0.lock().unwrap();
    let conn = conn_guard.as_ref().ok_or("Database not initialized")?;

    let mut stmt = conn.prepare("SELECT id, name, purpose FROM teams")
        .map_err(|e| e.to_string())?;

    let teams = stmt.query_map([], |row| {
        Ok(Team {
            id: row.get(0)?,
            name: row.get(1)?,
            purpose: row.get(2)?,
            members: vec!["agent-1".to_string(), "agent-2".to_string()],
        })
    }).map_err(|e| e.to_string())?;

    let mut result = Vec::new();
    for team in teams {
        result.push(team.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

#[tauri::command]
async fn get_debate_arguments(debate_id: String) -> Result<Vec<DebateArgument>, String> {
    Ok(vec![
        DebateArgument {
            id: "arg-1".to_string(),
            debate_id: debate_id.clone(),
            author: "Architect".to_string(),
            claim: "We should use microservices architecture".to_string(),
            evidence: vec!["Scalability benefits".to_string(), "Independent deployment".to_string()],
            strength: 0.85,
        },
        DebateArgument {
            id: "arg-2".to_string(),
            debate_id,
            author: "Critic".to_string(),
            claim: "Monolith is better for this use case".to_string(),
            evidence: vec!["Lower complexity".to_string(), "Faster development".to_string()],
            strength: 0.75,
        },
    ])
}

#[tauri::command]
async fn submit_debate_argument(argument: DebateArgument) -> Result<DebateArgument, String> {
    Ok(argument)
}

#[tauri::command]
async fn search_knowledge(query: String, state: State<'_, DbConnection>) -> Result<Vec<KnowledgeItem>, String> {
    let conn_guard = state.0.lock().unwrap();
    let conn = conn_guard.as_ref().ok_or("Database not initialized")?;

    // Insert some sample data if not exists
    let count: i32 = conn.query_row(
        "SELECT COUNT(*) FROM knowledge_items",
        [],
        |row| row.get(0),
    ).unwrap_or(0);

    if count == 0 {
        conn.execute(
            "INSERT INTO knowledge_items (id, title, content, tags, confidence)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![
                "knowledge-1",
                "Microservices Best Practices",
                "Guidelines for implementing microservices architecture",
                "architecture,microservices",
                0.95
            ],
        ).map_err(|e| e.to_string())?;

        conn.execute(
            "INSERT INTO knowledge_items (id, title, content, tags, confidence)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![
                "knowledge-2",
                "Team Collaboration Strategies",
                "Effective collaboration patterns for multi-agent teams",
                "team,collaboration",
                0.88
            ],
        ).map_err(|e| e.to_string())?;
    }

    let mut stmt = conn.prepare("SELECT id, title, content, tags, confidence FROM knowledge_items WHERE title LIKE ? OR content LIKE ?")
        .map_err(|e| e.to_string())?;

    let pattern = format!("%{}%", query);
    let items = stmt.query_map(params![pattern, pattern], |row| {
        Ok(KnowledgeItem {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            tags: row.get::<_, String>(3)?.split(',').map(|s| s.to_string()).collect(),
            confidence: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut result = Vec::new();
    for item in items {
        result.push(item.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

#[tauri::command]
async fn get_workflow_nodes(workflow_id: String) -> Result<Vec<WorkflowNode>, String> {
    Ok(vec![
        WorkflowNode {
            id: "node-1".to_string(),
            node_type: "agent_task".to_string(),
            label: "Analyze Requirements".to_string(),
            position: (100.0, 100.0),
        },
        WorkflowNode {
            id: "node-2".to_string(),
            node_type: "debate_session".to_string(),
            label: "Design Debate".to_string(),
            position: (300.0, 100.0),
        },
        WorkflowNode {
            id: "node-3".to_string(),
            node_type: "decision".to_string(),
            label: "Approve Design".to_string(),
            position: (500.0, 100.0),
        },
    ])
}

fn main() {
    let db = match init_db() {
        Ok(conn) => DbConnection(Mutex::new(Some(conn))),
        Err(e) => {
            eprintln!("Failed to initialize database: {}", e);
            DbConnection(Mutex::new(None))
        }
    };

    tauri::Builder::default()
        .manage(db)
        .invoke_handler(tauri::generate_handler![
            get_agents,
            create_agent,
            get_teams,
            get_debate_arguments,
            submit_debate_argument,
            search_knowledge,
            get_workflow_nodes,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
