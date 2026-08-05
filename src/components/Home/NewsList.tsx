import { useLanguage } from '../../contexts/LanguageContext';
import news from "../../data/news.json";

interface NewsItem {
  id: number;
  titleThai: string;
  titleEn: string;
  date: string;
  thumb: string;
  link: string;
}

export default function NewsList() {
  const { language } = useLanguage();

  // Function to get title based on current language
  const getTitle = (item: NewsItem) => {
    return language === 'th' ? item.titleThai : item.titleEn;
  };

  const translate = (thText: string, enText: string) => {
    return language === 'th' ? thText : enText;
  };

  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((item: NewsItem) => (
        <article
          key={item.id}
          className="flex gap-4 bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-300"
        >
          <img  
            src={item.thumb}
            alt={translate('ภาพข่าว', 'News thumbnail')}
            className="w-32 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{translate('BG UPDATE', 'BG UPDATE')}</span>
              <span>{item.date}</span>
            </div>

            <a
              href={item.link}
              className="block mt-2 font-semibold hover:underline text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              {getTitle(item)}
            </a>

            <div className="text-right mt-2">
              <a 
                href={item.link} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                {translate('อ่านต่อ', 'Read More')} &gt;
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}