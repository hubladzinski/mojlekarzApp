import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import InnerCard from "./innerCard"
import BlueText from "./blueText"
import Card from "./card"
import Button from "./button"

const DefaultSubText = css`
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 400;
`

const DefaultHeader = css`
  font-weight: 600;
`

const StyledH1 = styled.h1`
  ${DefaultHeader};
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

const StyledH2 = styled.h2`
  ${DefaultHeader};
  font-size: ${({ theme }) => theme.font.size.s};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.m};
  }
`

const StyledH3 = styled.h3`
  margin-top: 0.5em;
`

const StyledH4 = styled.h4`
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
`

const StyledParagraph1 = styled.p`
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
  margin-top: 1em;
`

const StyledDaysNum = styled.span`
  font-size: ${({ theme }) => theme.font.size.l};
  color: "#000";
  color: ${({ time }) =>
    time >= 100 ? ({ theme }) => theme.colors.timeBad : false};
  color: ${({ time }) =>
    time < 50 ? ({ theme }) => theme.colors.timeGood : false};
  color: ${({ time }) =>
    time >= 50 && time < 100 ? ({ theme }) => theme.colors.timeOK : false};
  font-weight: 400;
`

const StyledDays = styled.span`
  font-size: ${({ theme }) => theme.font.size.m};
  font-weight: 400;
`

const SubTextSmall = styled.p`
  ${DefaultSubText};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-top: 0.5em;
`

const SubTextBig = styled.p`
  ${DefaultSubText};
  font-size: ${({ theme }) => theme.font.size.s};
  &:nth-of-type(1) ~ & {
    margin-top: 1em;
  }
`

const Text = styled.h4`
  font-size: ${({ theme }) => theme.font.size.m};
  font-weight: 400;
  margin-top: 0.5em;
`

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
  &:nth-of-type(1) ~ & {
    margin-top: 1em;
  }
`

const InnerCardList = styled(InnerCard)`
  max-width: 400px;

  @media (min-width: 768px) {
    max-width: 550px;
  }
`

const StyledDateCardsWrapper = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`
const StyledBasicInfo = styled(InnerCard)`
  display: grid;
  gap: 15px;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  }
`

const populateArray = (length, input) => {
  let array = []
  for (let i = 0; i < length; i++) {
    array[i] = input
  }
  return array
}

const ResultsItems = ({
  className,
  results,
  physycian,
  city,
  totalResults,
  ...props
}) => {
  const [showPage, setShowPage] = useState([])

  useEffect(() => {
    const populatedArray = populateArray(results.length, false)
    setShowPage(populatedArray)
  }, [])

  const showMoreInfo = index => {
    const tempShowPage = showPage.map((item, innerIndex) => {
      if (innerIndex === index) {
        return (item = !item)
      }
      return item
    })
    setShowPage(tempShowPage)
  }

  return (
    <div className={className} {...props}>
      <StyledH1>
        <div>
          <BlueText>{physycian}, </BlueText>
          {city}
        </div>
        <div>Wyniki: {totalResults}</div>
      </StyledH1>
      {results.map((institution, index) => {
        let dateDifference = 999
        if (institution.attributes.dates) {
          dateDifference = Math.ceil(
            (new Date(institution.attributes.dates.date).getTime() -
              new Date().getTime()) /
              (1000 * 3600 * 24)
          )
        }
        return (
          <Card margin={"2em 0 0 0"} key={index}>
            <StyledH2>
              <BlueText>{institution.attributes.provider}</BlueText>
            </StyledH2>
            <StyledParagraph1>Przypadek stabilny</StyledParagraph1>
            <StyledDateCardsWrapper>
              <InnerCard margin={"15px 0 0 0"}>
                <StyledH4>Średni czas oczekiwania: </StyledH4>
                <StyledH3>
                  <StyledDaysNum
                    time={
                      institution.attributes.statistics
                        ? institution.attributes.statistics["provider-data"][
                            "average-period"
                          ]
                        : 999
                    }
                  >
                    {institution.attributes.statistics
                      ? institution.attributes.statistics["provider-data"][
                          "average-period"
                        ]
                      : "Brak danych"}
                  </StyledDaysNum>
                  <StyledDays>
                    {institution.attributes.statistics ? " dni" : null}
                  </StyledDays>
                </StyledH3>
                <SubTextSmall>
                  Status na miesiąc:
                  {institution.attributes.statistics
                    ? " " +
                      institution.attributes.statistics["provider-data"].update
                    : " Brak danych"}
                </SubTextSmall>
              </InnerCard>
              {institution.attributes.dates ? (
                <InnerCard margin={"15px 0 0 0"}>
                  <StyledH4>Najbliższy termin: </StyledH4>
                  <StyledH3>
                    <StyledDaysNum time={dateDifference}>
                      {institution.attributes.dates.date}
                    </StyledDaysNum>
                  </StyledH3>
                  <SubTextSmall>
                    Status na dzień:
                    {" " + institution.attributes.dates["date-situation-as-at"]}
                  </SubTextSmall>
                </InnerCard>
              ) : null}
            </StyledDateCardsWrapper>

            <StyledBasicInfo margin={"15px 0 0 0"}>
              <div>
                <SubTextBig>Telefon</SubTextBig>
                <Text>{institution.attributes.phone}</Text>
              </div>
              <div>
                <SubTextBig>Miejscowość</SubTextBig>
                <Text>{institution.attributes.locality}</Text>
              </div>
              <div>
                <SubTextBig>Ulica</SubTextBig>
                <Text>{institution.attributes.address}</Text>
              </div>
            </StyledBasicInfo>
            <InnerCard margin={"15px 0 0 0"}>
              <SubTextBig>Nazwa świadczenia określonego przez NFZ</SubTextBig>
              <Text>{institution.attributes.benefit}</Text>
              <SubTextBig>Nazwa miejsca udzielania świadczeń</SubTextBig>
              <Text>{institution.attributes.place}</Text>
            </InnerCard>
            {showPage[index] ? (
              <>
                <InnerCardList margin={"15px 0 0 0"}>
                  <ul>
                    <StyledListItem>
                      <p style={{ marginRight: "15px" }}>
                        Łazienka dla niepełnosprawnych:
                      </p>
                      {institution.attributes.toilet ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          color={"#0DA013"}
                          size={"2x"}
                        />
                      ) : null}
                    </StyledListItem>
                    <StyledListItem>
                      <p style={{ marginRight: "15px" }}>
                        Podjazd dla niepełnosprawnych:
                      </p>
                      {institution.attributes.ramp === "Y" ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          color={"#0DA013"}
                          size={"2x"}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          color={"#E23636"}
                          size={"2x"}
                        />
                      )}
                    </StyledListItem>
                    <StyledListItem>
                      <p style={{ marginRight: "15px" }}>Parking:</p>
                      {institution.attributes["car-park"] === "Y" ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          color={"#0DA013"}
                          size={"2x"}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          color={"#E23636"}
                          size={"2x"}
                        />
                      )}
                    </StyledListItem>
                    <StyledListItem>
                      <p style={{ marginRight: "15px" }}>Winda:</p>
                      {institution.attributes.elevator === "Y" ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          color={"#0DA013"}
                          size={"2x"}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          color={"#E23636"}
                          size={"2x"}
                        />
                      )}
                    </StyledListItem>
                  </ul>
                </InnerCardList>
              </>
            ) : null}
            <Button
              text={showPage[index] ? "Schowaj" : "Dodatkowe informacje"}
              margin={"15px 0 0 0"}
              onClick={() => showMoreInfo(index)}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default ResultsItems
