<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Traits\ApiResponseTrait;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    use ApiResponseTrait;

    public function store(CheckoutRequest $request)
    {
        $user = $request->user();
        $cart = Cart::with('items.product')->where('user_id', $user->id)->first();

        if (!$cart || $cart->items->isEmpty()) {
            return $this->errorResponse('Cart is empty', 400);
        }

        // Calculate total and validate stock
        $totalPrice = 0;
        foreach ($cart->items as $item) {
            if ($item->product->stock < $item->quantity) {
                return $this->errorResponse("Insufficient stock for product: {$item->product->name}", 400);
            }
            $totalPrice += $item->product->price * $item->quantity;
        }

        try {
            DB::beginTransaction();

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'completed', // Simplified
                'total_price' => $totalPrice,
            ]);

            // Create Order Items and reduce stock
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            // Clear Cart
            $cart->items()->delete();
            $cart->delete();

            DB::commit();

            return $this->successResponse(['order' => $order->load('items.product')], 'Order placed successfully', 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Failed to place order: ' . $e->getMessage(), 500);
        }
    }
}
