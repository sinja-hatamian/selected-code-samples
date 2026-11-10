<?php

declare(strict_types=1);

namespace CodeSamples\Backend;

final class OrderPricing
{
    public static function finalAmount(
        int $itemsSubtotal,
        int $shippingAmount,
        int $adjustmentAmount,
        int $discountAmount,
    ): int {
        return max(0, $itemsSubtotal + $shippingAmount + $adjustmentAmount - $discountAmount);
    }

    public static function validateFinancialFields(
        int $discountAmount,
        int $adjustmentAmount,
        int $itemsSubtotal,
    ): void {
        if ($discountAmount < 0) {
            throw new \InvalidArgumentException('DISCOUNT_NEGATIVE');
        }

        if ($adjustmentAmount < 0 && abs($adjustmentAmount) > $itemsSubtotal) {
            throw new \InvalidArgumentException('ADJUSTMENT_TOO_LARGE');
        }

        if ($discountAmount > $itemsSubtotal + max(0, $adjustmentAmount)) {
            throw new \InvalidArgumentException('DISCOUNT_TOO_LARGE');
        }
    }
}
