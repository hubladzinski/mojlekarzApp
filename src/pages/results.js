import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import MainLayout from "../layout/mainLayout"
import InnerLayout from "../layout/innerLayout"
import backgroundResults from "../assets/backgroundResults.svg"
import Pagination from "../components/pagination"
import ResultsItems from "../components/resultsItems"
import BlueText from "../components/blueText"
import Select from "../components/select"

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const BackgroundContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 0;
  bottom: -10%;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-image: url(${backgroundResults});
`

const StyledH1 = styled.h1`
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.m};
  margin-top: 2em;

  div:last-of-type {
    font-weight: 400;
    margin-top: 10px;
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.font.size.l};

    div:last-of-type {
      margin-top: 0;
    }
  }
`

const StyledPagination = styled(Pagination)`
  margin: 30px auto 0 auto;
`

const sortOptions = [
  { name: "Średni czas oczekiwania: od najkrótszego", code: "avgTimeMin" },
  { name: "Średni czas oczekiwania: od najdłużsego", code: "avgTimeMax" },
  { name: "Najbliższy termin: od najkrótszego", code: "dateMin" },
  { name: "Najbliższy termin: od najdłuższego", code: "dateMax" },
]

const sortByAvgTime = (institutions, order) => {
  if (order === "min") {
    return institutions.sort((a, b) => {
      if (a.attributes.statistics && b.attributes.statistics) {
        return (
          a.attributes.statistics["provider-data"]["average-period"] -
          b.attributes.statistics["provider-data"]["average-period"]
        )
      }
    })
  }
  if (order === "max") {
    return institutions.sort((a, b) => {
      if (a.attributes.statistics && b.attributes.statistics) {
        return (
          b.attributes.statistics["provider-data"]["average-period"] -
          a.attributes.statistics["provider-data"]["average-period"]
        )
      }
    })
  }
}

const sortByDate = (institutions, order) => {
  if (order === "min") {
    return institutions.sort((a, b) => {
      if (a.attributes.dates.date && b.attributes.dates.date) {
        return (
          new Date(a.attributes.dates.date).getTime() -
          new Date(b.attributes.dates.date).getTime()
        )
      }
    })
  }
  if (order === "max") {
    return institutions.sort((a, b) => {
      if (a.attributes.dates.date && b.attributes.dates.date) {
        return (
          new Date(b.attributes.dates.date).getTime() -
          new Date(a.attributes.dates.date).getTime()
        )
      }
    })
  }
}

const ResultsPage = ({ institutions, physycian, city }) => {
  const [sortedInstitutions, setSortedInstitutions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(5)

  const filteredInstitutions = institutions.filter(
    institution => institution.attributes.locality === city
  )

  useEffect(() => {
    if (city !== "") {
      setSortedInstitutions(sortByAvgTime(filteredInstitutions, "min"))
    } else {
      setSortedInstitutions(sortByAvgTime(institutions, "min"))
    }
  }, [])

  const sort = e => {
    console.log(e.target.value)
    switch (e.target.value) {
      case "avgTimeMin":
        setSortedInstitutions(sortByAvgTime(filteredInstitutions, "min"))
        break
      case "avgTimeMax":
        setSortedInstitutions(sortByAvgTime(filteredInstitutions, "max"))
        break
      case "dateMin":
        setSortedInstitutions(sortByDate(filteredInstitutions, "min"))
        break
      case "dateMax":
        setSortedInstitutions(sortByDate(filteredInstitutions, "max"))
        break
    }
  }

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = sortedInstitutions.slice(
    indexOfFirstResult,
    indexOfLastResult
  )

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <MainLayout>
      <StyledWrapper>
        <BackgroundContainer />
        <InnerLayout>
          <StyledH1>
            <div>
              <BlueText>{physycian}, </BlueText>
              {city}
            </div>
            <div>Wyniki: {sortedInstitutions.length}</div>
          </StyledH1>
          <Select
            text={sortOptions[0].name}
            options={sortOptions}
            handleChange={sort}
            label={"sort"}
            margin={"10px 0 0 0"}
            labelText={"Sortowanie"}
          />
          <ResultsItems results={currentResults} />
          <StyledPagination
            resultsPerPage={resultsPerPage}
            totalResults={sortedInstitutions.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </InnerLayout>
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
)(ResultsPage)
