import {useTranslations} from 'next-intl';

type Props = {
  params: Promise<{locale: string}>;
};

export default function HomePage({params}: Props) {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 mb-8">{t('subtitle')}</p>
          <p className="text-lg">{t('welcomeMessage')}</p>
        </div>
        

      </div>
    </div>
  );
} 