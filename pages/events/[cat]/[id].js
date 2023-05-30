import Image from 'next/image';

const EventPage = ({data}) => {
  console.log(data);
    return (
      <div>
        <Image src={data.image} width={1000} height={500} alt={data.title} />
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    )
  }
  
  export default EventPage;

  export async function getStaticPaths() {
    const { all_events } = await import('/data/data.json');
    const allEvents = all_events.map((ev) => {
      return {
        params: {
          cat: ev.city,
          id:ev.id.toString(),
          }
      };
    });
  
    return {
      paths: allEvents,
      fallback: false,
    }
  }

  export async function getStaticProps(context) {
    const { all_events } = await import('/data/data.json');
    const id = context?.params.id
    
    const eventData = all_events.find((ev) => id === ev.id);
    console.log(eventData);
  
    return {
      props:{data:eventData}
    };
  }