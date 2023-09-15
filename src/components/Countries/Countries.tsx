import useFetch from "../../hooks/useFetch";
import api from "../../api";

const Countries = () => {
  const { data, isloading, error } = useFetch(api.calendar.getCountries);

  if (isloading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No user found</div>;

  console.log("Countries", data);

  return (
    <div>
      <ul>
        <>
          {data.map(coutnry => (
            <li key={coutnry.countryCode}>{coutnry.name}</li>
          ))}
        </>
      </ul>
    </div>
  );
};

export default Countries;
