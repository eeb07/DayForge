export type TaskCategory = "study" | "exercise" | "assignment" | "personal"

export interface Task {
    task : string,
    start_time: string | null,
    duration_minutes: number,
    category: string
}

 



