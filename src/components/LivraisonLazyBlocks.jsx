import { DeliveryStickyMobile } from "./DeliveryStickyMobile";
import { DeliveryTracker } from "./DeliveryTracker";
import { DeliveryQuickOrder } from "./DeliveryQuickOrder";
import { DeliveryUseCases } from "./DeliveryUseCases";

export function LivraisonTopInteractive({ user, userData, onOpenDemand }) {
  return (
    <>
      <DeliveryStickyMobile onOpenFullModal={onOpenDemand} />
      <DeliveryTracker />
      <DeliveryQuickOrder
        user={user}
        userData={userData}
        onOpenFullModal={onOpenDemand}
      />
    </>
  );
}

export function LivraisonBottomInteractive({ onOpenDemand }) {
  return (
    <DeliveryUseCases
      onCommander={onOpenDemand}
      onOpenFullModal={onOpenDemand}
    />
  );
}
