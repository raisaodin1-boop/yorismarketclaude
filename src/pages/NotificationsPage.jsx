import { useEffect, useState } from "react";
import { NotificationCenter } from "../components/NotificationCenter";
import { consumeNotificationOpenId } from "../lib/notificationNavigation";

export function NotificationsPage({ user, refreshNotificationsFull, ...rest }) {
  const [initialSelectedId, setInitialSelectedId] = useState(() => consumeNotificationOpenId());

  useEffect(() => {
    if (user?.id && typeof refreshNotificationsFull === "function") {
      refreshNotificationsFull();
    }
  }, [user?.id, refreshNotificationsFull]);

  return (
    <section className="sec anim notif-page-wrap">
      <NotificationCenter variant="page" user={user} initialSelectedId={initialSelectedId} {...rest} />
    </section>
  );
}
