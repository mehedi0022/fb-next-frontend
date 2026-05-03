// Sidebar Types 

export interface AdminNavChild {
  label: string;
  href: string;
}
 
export interface AdminNavItem {
  label: string;
  icon: React.ElementType;
  href?: string;       
  badge?: number;
  children?: AdminNavChild[];
}