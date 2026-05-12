import { useEffect } from "react";
import { NotificationCenter } from "../components/NotificationCenter";

export function NotificationsPage({ user, refreshNotificationsFull, ...rest }) {
  useEffect(() => {
    if (user?.id && typeof refreshNotificationsFull === "function") {
      refreshNotificationsFull();
    }
  }, [user?.id, refreshNotificationsFull]);

  return (
    <section className="sec anim notif-page-wrap">
      <NotificationCenter variant="page" user={user} {...rest} />
    </section>
  );
}
