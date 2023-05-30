import Image from 'next/image';
import Link from 'next/link';

const EventsCatPage = ({data, pageName}) => {
  console.log(data);
  return (
    <div>
      <h1>Events in {pageName}</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
            <div> 
              <Image  width={300}  height={300} alt={ev.title} src={ev.image} />
              <h2>
                {ev.title}
              </h2>
              <p>{ev.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default EventsCatPage;



export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json');
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat:ev.id.toString(),
        }
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { all_events } = await import('/data/data.json');
  const id = context?.params.cat
  
  const data = all_events.filter(ev => ev.city === id);

  return {
    props:{data, pageName:id}
  };
}
