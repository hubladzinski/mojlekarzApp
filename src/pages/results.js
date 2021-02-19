import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import BackgroundLayout from "../layout/BackgroundLayout"
import Pagination from "../components/Pagination"
import ResultsItems from "../components/ResultsItems"
import BlueText from "../components/BlueText"
import Select from "../components/Select"
import { Heading2 } from "../components/Heading"

const StyledHeading2 = styled(Heading2)`
  margin-top: 2em;
  font-weight: 600;

  div:last-of-type {
    font-weight: 400;
    margin-top: 10px;
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;

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
  return institutions.sort((a, b) => {
    const { statistics: avgWaitTimeA } = a.attributes
    const { statistics: avgWaitTimeB } = b.attributes

    if (avgWaitTimeA || avgWaitTimeB) {
      if (avgWaitTimeA && avgWaitTimeB) {
        return order === "min"
          ? avgWaitTimeA["provider-data"]["average-period"] -
              avgWaitTimeB["provider-data"]["average-period"]
          : avgWaitTimeB["provider-data"]["average-period"] -
              avgWaitTimeA["provider-data"]["average-period"]
      } else if (avgWaitTimeA && !avgWaitTimeB) {
        return order === "min" ? -1 : 1
      } else {
        return order === "min" ? 1 : -1
      }
    }
    return null
  })
}

const sortByDate = (institutions, order) => {
  return institutions.sort((a, b) => {
    const { dates: nearestDateA } = a.attributes
    const { dates: nearestDateB } = b.attributes

    if (nearestDateA || nearestDateB) {
      if (nearestDateA && nearestDateB) {
        const dateA = new Date(nearestDateA.date).getTime()
        const dateB = new Date(nearestDateB.date).getTime()
        return order === "min" ? dateA - dateB : dateB - dateA
      } else if (nearestDateA && !nearestDateB) {
        return order === "min" ? -1 : 1
      } else {
        return order === "min" ? 1 : -1
      }
    } else return null
  })
}

const filterByCity = (institutions, city) =>
  institutions.filter(institution => institution.attributes.locality === city)

const ResultsPage = ({ institutions, physycian, city, voievodeship }) => {
  const [sortedInstitutions, setSortedInstitutions] = useState(() => {
    if (city !== "") {
      const filteredInstitutions = filterByCity(institutions, city)
      return filteredInstitutions
    } else {
      return institutions
    }
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(5)
  const [sortOrder, setSortOrder] = useState("avgTimeMin")
  const [currentResults, setCurrentResults] = useState([])
  const [place] = useState(() => {
    if (city !== "") {
      return city
    } else {
      return voievodeship
    }
  })

  useEffect(() => {
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    setCurrentResults(
      sortedInstitutions.slice(indexOfFirstResult, indexOfLastResult)
    )
  }, [currentPage, resultsPerPage, sortedInstitutions])

  useEffect(() => {
    switch (sortOrder) {
      case "avgTimeMin":
        setSortedInstitutions(sortByAvgTime([...sortedInstitutions], "min"))
        break
      case "avgTimeMax":
        setSortedInstitutions(sortByAvgTime([...sortedInstitutions], "max"))
        break
      case "dateMin":
        setSortedInstitutions(sortByDate([...sortedInstitutions], "min"))
        break
      case "dateMax":
        setSortedInstitutions(sortByDate([...sortedInstitutions], "max"))
        break
      default:
        break
    }
  }, [sortOrder])

  const changeSort = e => {
    setSortOrder(e.target.value)
  }

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <BackgroundLayout>
      <StyledHeading2 as="h1">
        <div>
          <BlueText>{physycian}, </BlueText>
          {place}
        </div>
        <div>Wyniki: {sortedInstitutions.length}</div>
      </StyledHeading2>
      <Select
        text={sortOptions[0].name}
        options={sortOptions}
        handleChange={changeSort}
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
    </BackgroundLayout>
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
)(ResultsPage)
