import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import MainLayout from "../layout/mainLayout"
import InnerLayout from "../layout/innerLayout"
import backgroundResults from "../assets/backgroundResults.svg"
import Pagination from "../components/pagination"
import ResultsItems from "../components/resultsItems"

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

const StyledPagination = styled(Pagination)`
  margin: 30px auto 0 auto;
`

const ResultsPage = ({ institutions, physycian, city }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(5)

  const filteredInstitutions = institutions.filter(
    institution => institution.attributes.locality === city
  )

  const sortedInstitutions = filteredInstitutions.sort((a, b) => {
    if (a.attributes.statistics && b.attributes.statistics) {
      return (
        a.attributes.statistics["provider-data"]["average-period"] -
        b.attributes.statistics["provider-data"]["average-period"]
      )
    }
  })

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
          <ResultsItems
            results={currentResults}
            totalResults={sortedInstitutions.length}
            physycian={physycian}
            city={city}
          />
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
