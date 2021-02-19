import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import MainLayout from "../layout/MainLayout"
import InnerLayout from "../layout/InnerLayout"
import backgroundResults from "../assets/backgroundResults.svg"
import { Paragraph } from "../components/Paragraph"
import SubParagraph from "../components/SubParagraph"
import { Heading } from "../components/Heading"
import Card from "../components/Card"
import InnerCard from "../components/InnerCard"

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
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
const StyledHeading = styled(Heading)`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
`

const StyledCard = styled(Card)`
  display: grid;
  grid-gap: 20px;
`

const List = styled.ul`
  list-style: none;

  @media (min-width: 768px) {
    display: flex;
  }

  li {
    margin-top: 10px;

    @media (min-width: 768px) {
      margin: 0;
    }

    :first-of-type {
      margin: 0;

      @media (min-width: 768px) {
        margin: 0 20px 0 0;
      }
    }
  }
`

const StatsWrapper = styled.span`
  font-weight: bold;

  color: ${({ theme, amountPerCitizensMark }) =>
    (amountPerCitizensMark.intMark === 0 && theme.colors.timeOK) ||
    (amountPerCitizensMark.intMark === 1 && theme.colors.timeGood) ||
    theme.colors.timeVeryGood};
`

const StyledParagraph = styled(Paragraph)`
  text-align: justify;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin: 0;
  }
`

const ContentWrapper = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    grid-template-areas: "text img";
  }

  @media (min-width: 1024px) {
    grid-gap: 40px;
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-area: img;
`

const ParagraphWrapper = styled.div`
  grid-area: text;
`

export const query = graphql`
  query($name: String!) {
    contentfulSpeciality(name: { eq: $name }) {
      name
      amountPerCitizens
      averageAmountPerCitizens
      standardDeviation
      image {
        file {
          url
        }
      }
      description {
        description
      }
      referral
    }
  }
`

const Speciality = props => {
  const {
    name,
    amountPerCitizens,
    image,
    description,
    averageAmountPerCitizens,
    standardDeviation,
    referral,
  } = props.data.contentfulSpeciality

  const [amountPerCitizensMark, setAmountPerCitizensMark] = useState({})

  useEffect(() => {
    if (amountPerCitizens - averageAmountPerCitizens > standardDeviation) {
      setAmountPerCitizensMark({ stringMark: "(Bardzo dobrze)", intMark: 2 })
    } else if (
      Math.abs(amountPerCitizens - averageAmountPerCitizens) > standardDeviation
    ) {
      setAmountPerCitizensMark({ stringMark: "(Źle)", intMark: 0 })
    } else {
      setAmountPerCitizensMark({ stringMark: "(Dobrze)", intMark: 1 })
    }
  }, [amountPerCitizens, averageAmountPerCitizens, standardDeviation])

  return (
    <MainLayout>
      <Wrapper>
        <BackgroundContainer />
        <InnerLayout>
          <StyledCard>
            <StyledHeading>{name}</StyledHeading>
            <InnerCard>
              <List>
                <li>
                  <Paragraph>
                    Wymagane skierowanie:
                    {referral ? " TAK" : " NIE"}
                  </Paragraph>
                </li>
                {amountPerCitizens && (
                  <li>
                    <Paragraph>
                      Ilość na 100000 mieszkańców: *
                      <StatsWrapper
                        amountPerCitizensMark={amountPerCitizensMark}
                      >{`${amountPerCitizens} ${amountPerCitizensMark.stringMark}`}</StatsWrapper>
                    </Paragraph>
                  </li>
                )}
              </List>
            </InnerCard>
            <InnerCard>
              <ContentWrapper>
                <Img src={image.file.url} />
                <ParagraphWrapper>
                  <StyledParagraph>{description.description}</StyledParagraph>
                </ParagraphWrapper>
              </ContentWrapper>
            </InnerCard>
            {amountPerCitizens && (
              <SubParagraph small>
                *Ilość na 100000 mieszkańców (średnia europejska):
                {" " + averageAmountPerCitizens}. Źródło:
                <a
                  href="https://data.europa.eu/euodp/en/data/dataset/ldUnKpPyLDYDQ4aCoYivzw"
                  target="_blank"
                  rel="noreferrer"
                >
                  eurostat
                </a>
              </SubParagraph>
            )}
          </StyledCard>
        </InnerLayout>
      </Wrapper>
    </MainLayout>
  )
}

export default Speciality
