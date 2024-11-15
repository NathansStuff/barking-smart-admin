import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { capitalizeString } from '@/utils/capitalizeString';
import { convertToSubcurrency } from '@/utils/convertToSubcurrency';

export function formatPlanInfo(plan: SubscriptionPlan | null): string {
  if (plan === null) return '';
  return `${plan.planName} - $${convertToSubcurrency(plan.planAmount)}/${capitalizeString(plan.billingInterval)} ${plan.currency.toLocaleUpperCase()}`;
}
