import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import BackgroundLayout from "../layout/BackgroundLayout"
import Card from "../components/Card"
import InnerCard from "../components/InnerCard"
import { Heading, Heading2 } from "../components/Heading"

const StyledCard = styled(Card)`
  margin-top: 50px;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

const StyledInnerCard = styled(InnerCard)`
  margin-top: 40px;
`

const OuterList = styled.ul`
  display: grid;
  list-style: none;
  grid-gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const InnerList = styled.ul`
  display: grid;
  grid-gap: 10px;
  font-size: ${({ theme }) => theme.font.size.s};
  padding: 5px 0 0 20px;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.m};
  }
`

const Info = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSpeciality(sort: { order: ASC, fields: name }) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `)

  const {
    allContentfulSpeciality: { edges },
  } = data

  const [groupedSpecialists, setGroupedSpecialists] = useState([])

  useEffect(() => {
    const groupAlphabetically = () => {
      let grouped = edges.reduce((acc, edge) => {
        let group = edge.node.name[0]
        if (!acc[group]) {
          acc[group] = { children: [edge.node] }
        } else {
          acc[group].children.push(edge.node)
        }

        return acc
      }, {})
      let groupedArray = Object.keys(grouped).map(key => [key, grouped[key]])
      setGroupedSpecialists(groupedArray)
    }
    groupAlphabetically()
  }, [edges])

  return (
    <BackgroundLayout>
      <StyledCard>
        <StyledHeading>Informacje dot. specjalności</StyledHeading>
        <StyledInnerCard>
          <OuterList>
            {groupedSpecialists.map(letter => {
              return (
                <li key={letter[0]}>
                  <Heading2>{letter[0].toUpperCase()}</Heading2>
                  <InnerList>
                    {letter[1].children.map(specialist => {
                      return (
                        <Link to={`/specialities/${specialist.name}`}>
                          <li key={specialist.id}>{specialist.name}</li>
                        </Link>
                      )
                    })}
                  </InnerList>
                </li>
              )
            })}
          </OuterList>
        </StyledInnerCard>
      </StyledCard>
    </BackgroundLayout>
  )
}

export default Info
