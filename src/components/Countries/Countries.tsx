import useFetch from "../../hooks/useFetch";
import api from "../../api";
import { CountriesGrid, Country } from "./styles";

const Countries = () => {
  const { data, isloading, error } = useFetch(api.calendar.getCountries);

  if (isloading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No user found</div>;

  return (
    <div>
      <CountriesGrid>
        <>
          {data.map(coutnry => (
            <Country key={coutnry.countryCode}>
              <img
                src={`https://flagsapi.com/${coutnry.countryCode}/flat/64.png`}
              />
              {coutnry.name}
            </Country>
          ))}
        </>
      </CountriesGrid>
    </div>
  );
};

export default Countries;
