import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import {
  toggleInstitutions,
  togglePhysycian,
  toggleCity,
  toggleVoievodeship,
} from "../state/app"
import MainLayout from "../layout/MainLayout"
import InnerLayout from "../layout/InnerLayout"
import Card from "../components/Card"
import InnerCard from "../components/InnerCard"
import styled, { css } from "styled-components"
import backgroundRotatedImg from "../assets/backgroundRotated.svg"
import background from "../assets/background.svg"
import BlueText from "../components/BlueText"
import Button from "../components/Button"
import Select from "../components/Select"
import DataList from "../components/DataList"
import Loader from "../components/Loader"
import { physicianTypes, voievodshipTypes } from "../utils/data"
import { Heading } from "../components/Heading"
import { fetchNFZData, updateCitiesArray } from "../utils/functions"

const Wrapper = styled.div`
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

const StyledHeading = styled(Heading)`
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

const ErrorMessage = styled.p`
  ${BaseMessage}
  color: ${({ theme }) => theme.colors.timeBad};
`

const InfoMessage = styled.p`
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

const ValidationNote = styled.div`
  margin-top: 5px;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.primary};
`

const IndexPage = ({ dispatch }) => {
  const [fetchingData, setFetchingData] = useState(false)
  const [isCitiesDataFetched, setIsCitiesDataFetched] = useState(false)
  const [rightCitySelected, setRightCitySelected] = useState(false)
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
    let response = await fetchNFZData(
      `https://api.nfz.gov.pl/app-itl-api/queues?limit=25&format=json&case=1&benefit=${benefit}&province=${province}`
    )
    setInstitutionsInVoievodeship(response)
    setCities(updateCitiesArray(response))
    setIsCitiesDataFetched(true)
    setFetchingData(false)
  }

  useEffect(() => {
    if (selectedPhysician.name !== "" && selectedVoievodeship.name !== "")
      fetchCities(selectedPhysician.code, selectedVoievodeship.code)
  }, [selectedPhysician, selectedVoievodeship])

  useEffect(() => {
    const isThisCityIncludedInList = cities.includes(selectedCity)
    if (isThisCityIncludedInList) {
      setRightCitySelected(true)
    } else {
      setRightCitySelected(false)
    }
  }, [selectedCity, cities])

  //Update state of institutions, physycian and city in redux

  useEffect(() => {
    dispatch(toggleInstitutions(institutionsInVoievodeship))
  }, [institutionsInVoievodeship, dispatch])

  useEffect(() => {
    dispatch(togglePhysycian(selectedPhysician.name))
  }, [selectedPhysician, dispatch])

  useEffect(() => {
    dispatch(toggleCity(selectedCity))
  }, [selectedCity, dispatch])

  useEffect(() => {
    dispatch(toggleVoievodeship(selectedVoievodeship.name))
  }, [selectedVoievodeship, dispatch])

  return (
    <MainLayout>
      <Wrapper>
        <StyledInnerLayout>
          <StyledCardUpper>
            <StyledHeading>
              <BlueText>Znajdź </BlueText>ośrodki, <BlueText>blisko </BlueText>
              Ciebie, świadczące usługi na <BlueText>NFZ</BlueText>
            </StyledHeading>
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
                <InfoMessage>Pobieranie listy miast...</InfoMessage>
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
                    <ErrorMessage>
                      Nie znaleziono placówek ze specjalnością:{" "}
                      {selectedPhysician.name} dla województwa:{" "}
                      {selectedVoievodeship.name}
                    </ErrorMessage>
                  </InnerCard>
                )}
            {isCitiesDataFetched && (
              <ValidationNote>
                Wybierz miasto z listy, lub pozostaw pole puste by szukać w
                całym województwie
              </ValidationNote>
            )}
            <Link to="/results">
              {cities.length > 0 &&
              fetchingData === false &&
              isCitiesDataFetched &&
              rightCitySelected ? (
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
      </Wrapper>
    </MainLayout>
  )
}

export default connect(
  state => ({
    institutions: state.app.institutions,
    physycian: state.app.physycian,
    city: state.app.city,
    voievodeship: state.app.voievodeship,
  }),
  null
)(IndexPage)
