import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

    if (orderId) {
      dispatch(createNewOrder({ orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast({
            title: "Order Confirmed!",
            description: "Your order has been placed successfully.",
            variant: "success",
          });
          window.location.href = "/shop/account";
        } else {
          toast({
            title: "Order Failed!",
            description: "Something went wrong, please try again.",
            variant: "destructive",
          });
        }
      });
    }
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Order...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default OrderConfirmationPage;
