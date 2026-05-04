export interface PatchNote {
  date: string;
  title?: string;
  items: string[];
}

export const patchNotes: PatchNote[] = [
  {
    date: "May 2026",
    title: "Upcoming",
    items: [
      "Improve form validation and error messages",
      "Add confirmation before deleting todos",
      "Improve responsive styling for smaller screens",
      "Add empty-state guidance for new users",
      "Consider adding authentication and user-specific todos",
    ],
  },
  {
    date: "4 May 2026",
    title: "Authless CRUD todo app",
    items: [
      "Converted the task page into a simple authless todo CRUD application",
      "Removed Supabase access token handling from the frontend",
      "Updated task APIs to create, read, update and delete todos without authentication",
      "Added support for editing todo title, description, due date and status",
      "Changed status updates so they only happen when editing and saving a todo",
      "Updated the dashboard to load todo data without authentication",
    ],
  },
  {
    date: "4 May 2026",
    title: "Todo dashboard",
    items: [
      "Added dashboard summary cards for total, to do, in progress, done and overdue todos",
      "Updated overdue calculation to ignore todos without a due date",
      "Added a link from the dashboard to the todos page",
      "Cleaned up page wording to match the todo exercise",
    ],
  },
  {
    date: "4 May 2026",
    title: "Legal and exercise pages cleanup",
    items: [
      "Updated the privacy notice for the authless MoJ Todo Exercise",
      "Updated the terms page to remove references to accounts, subscriptions and payments",
      "Added clearer wording that the application is for test data only",
      "Added guidance that todos are shared application data in the authless version",
    ],
  },
  {
    date: "3 May 2026",
    title: "Initial task management setup",
    items: [
      "Created the initial task list page",
      "Added the ability to create tasks with a title, description, due date and status",
      "Added API routes for loading and managing tasks",
      "Connected the app to the database-backed tasks table",
    ],
  },
];