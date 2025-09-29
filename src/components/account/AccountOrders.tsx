import React, { useState } from 'react';
import {
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  RotateCcw,
} from 'lucide-react';
import Button from '../Button';

export default function AccountOrders() {
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-09-08',
      status: 'delivered',
      total: 299.97,
      items: [
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          price: 129.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        },
        {
          id: 2,
          name: 'Smartphone Case - Black',
          price: 24.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
        },
        {
          id: 3,
          name: 'USB-C Cable 2m',
          price: 19.99,
          quantity: 6,
          image: '/api/placeholder/80/80',
        },
      ],
      shippingAddress: '1247 Maple Street, San Francisco, CA 94102',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-09-05',
      status: 'shipped',
      total: 89.99,
      items: [
        {
          id: 4,
          name: 'Portable Charger 10000mAh',
          price: 49.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        },
        {
          id: 5,
          name: 'Screen Protector',
          price: 19.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
        },
      ],
      shippingAddress: '1247 Maple Street, San Francisco, CA 94102',
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-09-01',
      status: 'processing',
      total: 159.98,
      items: [
        {
          id: 6,
          name: 'Laptop Stand - Adjustable',
          price: 79.99,
          quantity: 2,
          image: '/api/placeholder/80/80',
        },
      ],
      shippingAddress: '1247 Maple Street, San Francisco, CA 94102',
      trackingNumber: null,
    },
    {
      id: 'ORD-2024-004',
      date: '2024-08-28',
      status: 'cancelled',
      total: 199.99,
      items: [
        {
          id: 7,
          name: 'Gaming Mouse - RGB',
          price: 199.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        },
      ],
      shippingAddress: '1247 Maple Street, San Francisco, CA 94102',
      trackingNumber: null,
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'shipped':
        return <Truck size={20} className="text-blue-400" />;
      case 'processing':
        return <Clock size={20} className="text-ember-400" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-400" />;
      default:
        return <Package size={20} className="text-charcoal-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'processing':
        return 'bg-ember-500/20 text-ember-400 border-ember-400/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      default:
        return 'bg-charcoal-500/20 text-charcoal-400 border-charcoal-400/30';
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    {
      value: 'processing',
      label: 'Processing',
      count: orders.filter((o) => o.status === 'processing').length,
    },
    {
      value: 'shipped',
      label: 'Shipped',
      count: orders.filter((o) => o.status === 'shipped').length,
    },
    {
      value: 'delivered',
      label: 'Delivered',
      count: orders.filter((o) => o.status === 'delivered').length,
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      count: orders.filter((o) => o.status === 'cancelled').length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ---------- Header ---------- */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-ember-400 mb-1 text-2xl font-bold">
              Order History
            </h2>
            <p className="text-charcoal-300">Track and manage your orders</p>
          </div>

          {/* ---------- Filter Tabs ---------- */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`ember-transition flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium ${
                  filter === option.value
                    ? 'bg-ember-500 text-white shadow-md'
                    : 'bg-charcoal-700 text-charcoal-200 hover:bg-charcoal-600 ember-hover-border'
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    filter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-charcoal-600 text-charcoal-300'
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Orders List ---------- */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="glass-effect overflow-hidden rounded-xl"
          >
            {/* ---------- Order Header ---------- */}
            <div className="p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-charcoal-700 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                    <Package size={24} className="text-ember-400" />
                  </div>

                  <div>
                    <h3 className="text-ember-400 mb-1 text-lg font-semibold">
                      {order.id}
                    </h3>
                    <p className="text-charcoal-300 text-sm">
                      Placed on{' '}
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-4 lg:justify-end">
                  <div className="text-right">
                    <div className="text-charcoal-100 text-lg font-bold">
                      ${order.total}
                    </div>
                    <div
                      className={`inline-flex items-center space-x-1 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id,
                      )
                    }
                    className="text-charcoal-400 hover:text-ember-400 ember-transition p-2"
                  >
                    {expandedOrder === order.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* ---------- Quick Actions ---------- */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  text="View Details"
                  variant="secondary"
                  size="sm"
                  startIcon={<Eye size={14} />}
                />
                {order.trackingNumber && (
                  <Button
                    text="Track Package"
                    variant="secondary"
                    size="sm"
                    startIcon={<Truck size={14} />}
                  />
                )}
                {order.status === 'delivered' && (
                  <Button
                    text="Reorder"
                    variant="secondary"
                    size="sm"
                    startIcon={<RotateCcw size={14} />}
                  />
                )}
              </div>
            </div>

            {/* ---------- Expanded Order Details ---------- */}
            {expandedOrder === order.id && (
              <div className="border-charcoal-600 bg-charcoal-800/50 border-t p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* ---------- Order Items ---------- */}
                  <div>
                    <h4 className="text-ember-400 mb-4 text-sm font-semibold">
                      Order Items ({order.items.length})
                    </h4>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="bg-charcoal-600 flex h-16 w-16 items-center justify-center rounded-lg">
                            <Package size={20} className="text-charcoal-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-charcoal-100 truncate text-sm font-medium">
                              {item.name}
                            </h5>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-charcoal-400 text-xs">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-charcoal-400 text-xs">
                                ×
                              </span>
                              <span className="text-ember-400 text-xs font-medium">
                                ${item.price}
                              </span>
                            </div>
                          </div>
                          <div className="text-charcoal-100 text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ---------- Order Info ---------- */}
                  <div>
                    <h4 className="text-ember-400 mb-4 text-sm font-semibold">
                      Order Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-charcoal-400 mb-1 text-xs tracking-wide uppercase">
                          Shipping Address
                        </div>
                        <div className="text-charcoal-200 text-sm">
                          {order.shippingAddress}
                        </div>
                      </div>

                      {order.trackingNumber && (
                        <div>
                          <div className="text-charcoal-400 mb-1 text-xs tracking-wide uppercase">
                            Tracking Number
                          </div>
                          <div className="text-charcoal-200 font-mono text-sm">
                            {order.trackingNumber}
                          </div>
                        </div>
                      )}

                      <div className="border-charcoal-600 border-t pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-charcoal-200 text-sm font-medium">
                            Total
                          </span>
                          <span className="text-ember-400 text-lg font-bold">
                            ${order.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="glass-effect rounded-xl p-12 text-center">
            <Package size={48} className="text-charcoal-400 mx-auto mb-4" />
            <h3 className="text-charcoal-300 mb-2 text-xl font-semibold">
              No orders found
            </h3>
            <p className="text-charcoal-400">
              {filter === 'all'
                ? "You haven't placed any orders yet."
                : `No ${filter} orders found.`}
            </p>
            <Button
              text="Start Shopping"
              variant="primary"
              size="md"
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
