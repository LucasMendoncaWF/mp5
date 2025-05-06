import { useTranslations } from 'next-intl';

export default function Subscriptions() {
  const t = useTranslations();
  const subscriptions = [
    {
      id: 1,
      title: 'Free',
      price: 0,
      color: 'secondary',
      perks: ['Example perk 1', 'Example perk 2', 'Example perk 3', 'Example perk 4'],
    },
    {
      id: 2,
      title: `Premium (${t('current')})`,
      price: 12,
      color: 'primary',
      perks: ['Example perk 1', 'Example perk 2', 'Example perk 3', 'Example perk 4'],
    },
    {
      id: 3,
      title: 'Diamond',
      price: 18,
      color: 'tertiary',
      perks: ['Example perk 1', 'Example perk 2', 'Example perk 3', 'Example perk 4'],
    },
  ];

  return (
    <div>
      <div className="w-full p-4 text-text-color normal-case font-bold text-xl">
        {t('ChangePlan')}
      </div>
      <hr className="border-primary border-2" />
      <div className="flex w-full flex-wrap">
        {subscriptions.map((plan) => (
          <div
            className={`bg-${plan.color} border-black p-5 py-8 text-black normal-case md:w-1/3 w-full`}
            key={plan.id}
          >
            <div className="text-xl font-bold">{plan.title}</div>
            <ul className="mt-2 list-disc">
              {plan.perks.map((perk, index) => (
                <li className="ml-8 font-bold mt-1" key={plan.title + index}>
                  {perk}
                </li>
              ))}
            </ul>
            <button className="bg-white text-black font-bold border-4 border-black p-2 px-4 w-full mt-8 cursor-pointer transition hover:opacity-80">
              {t('selectPlan')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
