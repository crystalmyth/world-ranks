import {useState} from 'react'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/SearchInput/SearchInput'
import CountriesTable from '../components/CountriesTable/CountriesTable'

export default function Home({countries}) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = [...countries].filter((country) => country.name.toLowerCase().includes(keyword)) ||
  [...countries].filter((country) => country.region.toLowerCase().includes(keyword)) ||
  [...countries].filter((country) => country.subregion.toLowerCase().includes(keyword))

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase())
  }


  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {filteredCountries.length} countries</div>

        <div className={styles.input}>
          <SearchInput placeholder="Input by Name, Region or Sub-Region" onChange={onInputChange} />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}


export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries = await res.json();
  return {
    props:{
      countries,
    }
  }
}