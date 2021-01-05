import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import { toggleInstitutions, togglePhysycian, toggleCity } from "../state/app"
import MainLayout from "../layout/mainLayout"
import InnerLayout from "../layout/innerLayout"
import Card from "../components/card"
import InnerCard from "../components/innerCard"
import styled, { css } from "styled-components"
import backgroundRotatedImg from "../assets/backgroundRotated.svg"
import background from "../assets/background.svg"
import BlueText from "../components/blueText"
import Button from "../components/button"
import Select from "../components/select"
import DataList from "../components/dataList"
import Loader from "../components/loader"

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  background-image: url(${backgroundRotatedImg});

  @media (min-width: 768px) {
    background-image: url(${background});
  }
`

const StyledInnerLayout = styled(InnerLayout)`
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
  }
`

const StyledCardUpper = styled(Card)`
  margin: 6em 0 0 0;
  padding: 1.5em;

  @media (min-width: 768px) {
    margin: 0 50px 0 0;
    padding: 4em 0;
  }
`

const StyledCardLower = styled(Card)`
  margin-top: 25px;

  @media (min-width: 768px) {
    margin: 0;
  }
`

const StyledH2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.m};
  font-weight: 400;
  text-align: center;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`

const BaseMessage = css`
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
`

const StyledErrorMessage = styled.p`
  ${BaseMessage}
  color: ${({ theme }) => theme.colors.timeBad};
`

const StyledInfoMessage = styled.p`
  ${BaseMessage}
  color: ${({ theme }) => theme.colors.primary};
`

const StyledLoader = styled(Loader)`
  display: block;
`
const StyledInnerCard = styled(InnerCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const IndexPage = ({ dispatch }) => {
  const [fetchingData, setFetchingData] = useState(false)
  const [isCitiesDataFetched, setIsCitiesDataFetched] = useState(false)
  const [selectedPhysician, setSelectedPhysician] = useState({
    name: "",
    code: "",
  })
  const [selectedVoievodeship, setSelectedVoievodeship] = useState({
    name: "",
    code: "",
  })
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
    let index = e.nativeEvent.target.selectedIndex
    setSelectedVoievodeship({
      name: e.nativeEvent.target[index].text,
      code: e.target.value,
    })
  }

  const updateCity = e => {
    setSelectedCity(e.target.value)
  }

  const fetchCities = async (benefit, province) => {
    setFetchingData(true)
    let response = await getNFZData(
      `https://api.nfz.gov.pl/app-itl-api/queues?limit=25&format=json&case=1&benefit=${benefit}&province=${province}`
    )
    setInstitutionsInVoievodeship(response)
    setCities(updateCities(response))
    setIsCitiesDataFetched(true)
    setFetchingData(false)
  }

  useEffect(() => {
    if (selectedPhysician.name !== "" && selectedVoievodeship.name !== "")
      fetchCities(selectedPhysician.code, selectedVoievodeship.code)
  }, [selectedPhysician, selectedVoievodeship])

  //Update state of institutions, physycian and city in redux

  useEffect(() => {
    dispatch(toggleInstitutions(institutionsInVoievodeship))
  }, [institutionsInVoievodeship])

  useEffect(() => {
    dispatch(togglePhysycian(selectedPhysician.name))
  }, [selectedPhysician])

  useEffect(() => {
    dispatch(toggleCity(selectedCity))
  }, [selectedCity])

  return (
    <MainLayout>
      <StyledWrapper>
        <StyledInnerLayout>
          <StyledCardUpper>
            <StyledH2>
              <BlueText>Znajdź </BlueText>ośrodki, <BlueText>blisko </BlueText>
              Ciebie, świadczące usługi na <BlueText>NFZ</BlueText>
            </StyledH2>
          </StyledCardUpper>
          <StyledCardLower>
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
            {fetchingData && (
              <StyledInnerCard margin={"15px 0 0 0"}>
                <StyledInfoMessage>Pobieranie listy miast...</StyledInfoMessage>
                <StyledLoader margin={"15px 0 0 0"} />
              </StyledInnerCard>
            )}
            {cities.length > 0
              ? fetchingData === false && (
                  <DataList
                    text={"Wpisz miasto:"}
                    margin={"15px 0 0 0"}
                    options={cities}
                    name={"cities"}
                    handleChange={updateCity}
                    placeholder={"Wpisz lub wybierz miasto"}
                  />
                )
              : isCitiesDataFetched &&
                fetchingData === false && (
                  <InnerCard margin={"15px 0 0 0"}>
                    <StyledErrorMessage>
                      Nie znaleziono placówek ze specjalnością:{" "}
                      {selectedPhysician.name} dla województwa:{" "}
                      {selectedVoievodeship.name}
                    </StyledErrorMessage>
                  </InnerCard>
                )}
            <Link to="/results">
              {cities.length > 0 &&
              fetchingData === false &&
              isCitiesDataFetched ? (
                <Button text={"Szukaj"} margin={"15px 0 0 0"} />
              ) : (
                <Button
                  text={"Szukaj"}
                  margin={"15px 0 0 0"}
                  disabled
                  backgroundColor={"gray"}
                />
              )}
            </Link>
          </StyledCardLower>
        </StyledInnerLayout>
      </StyledWrapper>
    </MainLayout>
  )
}

export default connect(
  state => ({
    institutions: state.app.institutions,
    physycian: state.app.physycian,
    city: state.app.city,
  }),
  null
)(IndexPage)
