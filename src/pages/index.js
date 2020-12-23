import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import MainLayout from "../layout/mainLayout"
import InnerLayout from "../layout/innerLayout"
import Card from "../components/card"
import styled from "styled-components"
import backgroundRotatedImg from "../assets/backgroundRotated.svg"
import BlueText from "../components/blueText"
import Button from "../components/button"
import Select from "../components/select"
import DataList from "../components/dataList"

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  background-image: url(${backgroundRotatedImg});
`

const StyledH2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.m};
  font-weight: 400;
  text-align: center;
`

const physicianTypes = [
  { name: "Alergologia", code: "alergolog" },
  { name: "Anestezjologia", code: "anestezjolog" },
  { name: "Chirurgia", code: "chirurg" },
  { name: "Dermatologia", code: "dermatolog" },
  { name: "Gastroenterologia", code: "gastroenterolog" },
  { name: "Geriatraia", code: "geriatr" },
  { name: "Ginekologia", code: "ginekolog" },
  { name: "Immunologia", code: "immunolog" },
  { name: "Kardiologia", code: "kardiolog" },
  { name: "Medycyna paliatywna", code: "paliat" },
  { name: "Medycyna sądowa", code: "sąd" },
  { name: "Medycyna sportowa", code: "sport" },
  { name: "Nefrologia", code: "nefrolog" },
  { name: "Neurologia", code: "neurolog" },
  { name: "Okulistyka", code: "okulist" },
  { name: "Onkologia", code: "onkolog" },
  { name: "Ortopedia", code: "ortoped" },
  { name: "Otolaryngologia", code: "otolaryngolog" },
  { name: "Patologia", code: "patolog" },
  { name: "Pediatria", code: "pediatr" },
  { name: "Położnictwo", code: "położ" },
  { name: "Psychiatria", code: "psychiatryczny" },
  { name: "Pulmonologia", code: "pulmonolog" },
  { name: "Radioterapia", code: "radiot" },
  { name: "Rehabilitacja", code: "rehabilitacji" },
  { name: "Reumatologia", code: "reumatolog" },
  { name: "Seksuologia", code: "seksuolog" },
  { name: "Toksykologia", code: "toksykolog" },
  { name: "Urologia", code: "poradnia urologiczna" },
  { name: "Wenerologia", code: "wnereolog" },
]
const voievodshipTypes = [
  { name: "Dolnośląskie", code: "01" },
  { name: "Kujawsko-pomorskie", code: "02" },
  { name: "Lubelskie", code: "03" },
  { name: "Lubuskie", code: "04" },
  { name: "Łódzkie", code: "05" },
  { name: "Małopolskie", code: "06" },
  { name: "Mazowieckie", code: "07" },
  { name: "Opolskie", code: "08" },
  { name: "Podkarpackie", code: "09" },
  { name: "Podlaskie", code: "10" },
  { name: "Pomorskie", code: "11" },
  { name: "Śląskie", code: "12" },
  { name: "Świętokrzyskie", code: "13" },
  { name: "Warmińsko-mazurskie", code: "14" },
  { name: "Wielkopolskie", code: "15" },
  { name: "Zachodniopomorskie", code: "16" },
]

async function getNFZData(url) {
  let places = []
  let NFZData = await fetch(url)
  let parsedNFZData = await NFZData.json()
  places.push(...parsedNFZData.data)

  if (parsedNFZData.links.next && parsedNFZData.links.next !== null) {
    let response = await getNFZData(
      `https://api.nfz.gov.pl${parsedNFZData.links.next}`
    )
    places.push(...response)
  }

  return places
}

const updateCities = response => {
  let array = []
  response.forEach(item => {
    if (!array.includes(item.attributes.locality))
      array.push(item.attributes.locality)
  })

  return array
}

const IndexPage = () => {
  const [isCitiesDataFetched, setIsCitiesDataFetched] = useState(false)
  const [selectedPhysician, setSelectedPhysician] = useState({
    nam: "",
    code: "",
  })
  const [selectedVoievodeship, setSelectedVoievodeship] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [cities, setCities] = useState([])
  const [institutionsInVoievodeship, setInstitutionsInVoievodeship] = useState(
    []
  )

  const updatePhysician = e => {
    let index = e.nativeEvent.target.selectedIndex
    setSelectedPhysician({
      name: e.nativeEvent.target[index].text,
      code: e.target.value,
    })
  }

  const updateVoievodeship = e => {
    setSelectedVoievodeship(e.target.value)
  }

  const updateCity = e => {
    setSelectedCity(e.target.value)
  }

  const fetchCities = async (benefit, province) => {
    console.log("--------------proceeding------------")
    let response = await getNFZData(
      `https://api.nfz.gov.pl/app-itl-api/queues?limit=25&format=json&case=1&benefit=${benefit}&province=${province}`
    )
    console.log(response)
    let citiesArray = updateCities(response)
    setInstitutionsInVoievodeship(response)
    setCities(citiesArray)
    setIsCitiesDataFetched(true)
  }

  useEffect(() => {
    if (selectedPhysician.name !== "" && selectedVoievodeship !== "")
      fetchCities(selectedPhysician.code, selectedVoievodeship)
  }, [selectedPhysician, selectedVoievodeship])

  return (
    <MainLayout>
      <StyledWrapper>
        <InnerLayout>
          <Card margin={"6em 0 0 0"} padding={"1.5em"}>
            <StyledH2>
              <BlueText>Znajdź </BlueText>ośrodki, <BlueText>blisko </BlueText>
              Ciebie, świadczące usługi na <BlueText>NFZ</BlueText>
            </StyledH2>
          </Card>
          <Card margin={"25px 0 0 0"}>
            <Select
              text={"Wybierz lekarza:"}
              options={physicianTypes}
              handleChange={updatePhysician}
            />
            <Select
              text={"Wybierz województwo:"}
              options={voievodshipTypes}
              margin={"15px 0 0 0"}
              handleChange={updateVoievodeship}
            />
            {isCitiesDataFetched && (
              <DataList
                text={"Wpisz miasto:"}
                options={cities}
                margin={"15px 0 0 0"}
                name={"cities"}
                handleChange={updateCity}
                placeholder={"Wpisz lub wybierz miasto"}
              />
            )}
            <Link
              to="/results"
              state={{
                institutions: institutionsInVoievodeship,
                physycian: selectedPhysician.name,
                city: selectedCity,
              }}
            >
              <Button text={"Szukaj"} margin={"15px 0 0 0"} />
            </Link>
          </Card>
        </InnerLayout>
      </StyledWrapper>
    </MainLayout>
  )
}

export default IndexPage
