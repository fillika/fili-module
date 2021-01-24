export function createEvent(id: any, action: string) {
  if (typeof id === "string") {
    const event = new CustomEvent(id + action, { bubbles: true });
    document.dispatchEvent(event);
  }
}