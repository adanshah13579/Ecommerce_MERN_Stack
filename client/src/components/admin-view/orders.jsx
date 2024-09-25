import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <>
      {/* <style>
        {`
          @media (max-width: 640px) {
            .card {
              padding: 0.5rem;
              width: 100%;
            }
            .table {
              font-size: 0.875rem;
            }
            .table th, .table td {
              padding: 0.5rem;
            }
          }
          .card {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 1rem;
          }
          .table {
            width: 100%;
            font-size: 1rem;
          }
        `}
      </style> */}
      <Card className="card">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">Order ID</TableHead>
                <TableHead className="font-bold text-black">Order Date</TableHead>
                <TableHead className="font-bold text-black">Order Status</TableHead>
                <TableHead className="font-bold text-black">Order Price</TableHead>
                <TableHead className="font-bold text-black">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow
                      key={orderItem._id}
                      className="hover:bg-slate-200 hover:text-black transition-colors duration-200 cursor-pointer"
                    >
                      <TableCell className="font-bold text-black">{orderItem?._id}</TableCell>
                      <TableCell className="font-bold text-black">{orderItem?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          } font-bold text-white`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-black">Rs:{orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            className="bg-orange-500 text-black font-bold"
                            onClick={() => handleFetchOrderDetails(orderItem?._id)}
                          >
                            View Details
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default AdminOrdersView;
