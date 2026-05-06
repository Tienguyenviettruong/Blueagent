#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
struct Agent {
    id: String,
    name: String,
    role: String,
    provider: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Team {
    id: String,
    name: String,
    purpose: String,
    members: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct DebateArgument {
    id: String,
    debate_id: String,
    author: String,
    claim: String,
    evidence: Vec<String>,
    strength: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct KnowledgeItem {
    id: String,
    title: String,
    content: String,
    tags: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct WorkflowNode {
    id: String,
    node_type: String,
    label: String,
    position: (f64, f64),
}

#[tauri::command]
async fn get_agents() -> Result<Vec<Agent>, String> {
    Ok(vec![
        Agent {
            id: "agent-1".to_string(),
            name: "Architect".to_string(),
            role: "proposer".to_string(),
            provider: "openai".to_string(),
        },
        Agent {
            id: "agent-2".to_string(),
            name: "Critic".to_string(),
            role: "critic".to_string(),
            provider: "claude".to_string(),
        },
        Agent {
            id: "agent-3".to_string(),
            name: "Synthesizer".to_string(),
            role: "synthesizer".to_string(),
            provider: "gemini".to_string(),
        },
        Agent {
            id: "agent-4".to_string(),
            name: "Executor".to_string(),
            role: "executor".to_string(),
            provider: "ollama".to_string(),
        },
    ])
}

#[tauri::command]
async fn create_agent(agent: Agent) -> Result<Agent, String> {
    Ok(agent)
}

#[tauri::command]
async fn get_teams() -> Result<Vec<Team>, String> {
    Ok(vec![
        Team {
            id: "team-1".to_string(),
            name: "Product Development".to_string(),
            purpose: "Develop new features".to_string(),
            members: vec!["agent-1".to_string(), "agent-2".to_string(), "agent-3".to_string()],
        },
        Team {
            id: "team-2".to_string(),
            name: "Research Team".to_string(),
            purpose: "Market research and analysis".to_string(),
            members: vec!["agent-3".to_string(), "agent-4".to_string()],
        },
    ])
}

#[tauri::command]
async fn get_debate_arguments(debate_id: String) -> Result<Vec<DebateArgument>, String> {
    Ok(vec![
        DebateArgument {
            id: "arg-1".to_string(),
            debate_id: debate_id.clone(),
            author: "agent-1".to_string(),
            claim: "We should use microservices architecture".to_string(),
            evidence: vec!["Scalability benefits".to_string(), "Independent deployment".to_string()],
            strength: 0.85,
        },
        DebateArgument {
            id: "arg-2".to_string(),
            debate_id: debate_id.clone(),
            author: "agent-2".to_string(),
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
async fn search_knowledge(query: String) -> Result<Vec<KnowledgeItem>, String> {
    Ok(vec![
        KnowledgeItem {
            id: "knowledge-1".to_string(),
            title: "Microservices Best Practices".to_string(),
            content: "Guidelines for implementing microservices architecture...".to_string(),
            tags: vec!["architecture".to_string(), "microservices".to_string()],
        },
        KnowledgeItem {
            id: "knowledge-2".to_string(),
            title: "Team Collaboration Strategies".to_string(),
            content: "Effective collaboration patterns for multi-agent teams...".to_string(),
            tags: vec!["team".to_string(), "collaboration".to_string()],
        },
    ])
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
    tauri::Builder::default()
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
