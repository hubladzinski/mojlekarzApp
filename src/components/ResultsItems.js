import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import InnerCard from "./InnerCard"
import BlueText from "./BlueText"
import Card from "./Card"
import Button from "./Button"
import { Heading3 } from "./Heading"
import SubParagraph from "./SubParagraph"
import { Paragraph2, Paragraph3 } from "./Paragraph"

const DateWrapper = styled.h3`
  margin-top: 5px;
`

const StyledHeading3 = styled(Heading3)`
  font-weight: 400;
`

const StyledParagraph2 = styled(Paragraph2)`
  margin-top: 20px;
`

const StyledParagraph3 = styled(Paragraph3)`
  margin-top: 15px;
`

const StyledSubParagraph1 = styled(SubParagraph)`
  &:nth-of-type(1) ~ & {
    margin-top: 20px;
  }
`

const StyledSubParagraph2 = styled(SubParagraph)`
  margin-top: 10px;
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

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
  &:nth-of-type(1) ~ & {
    margin-top: 10px;
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

const ResultsItems = ({ className, results, ...props }) => {
  const [showPage, setShowPage] = useState()

  useEffect(() => {
    setShowPage(results.map(() => false))
  }, [results])

  const showMoreInfo = index => {
    setShowPage(prevShowPage =>
      prevShowPage.map((item, innerIndex) => {
        if (innerIndex === index) {
          return (item = !item)
        }
        return item
      })
    )
  }

  return (
    <div className={className} {...props}>
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
            <Heading3 responsive as="h2">
              <BlueText>{institution.attributes.provider}</BlueText>
            </Heading3>
            <StyledParagraph2>Przypadek stabilny</StyledParagraph2>
            <StyledDateCardsWrapper>
              <InnerCard margin={"15px 0 0 0"}>
                <StyledHeading3 as="h4">
                  Średni czas oczekiwania:
                </StyledHeading3>
                <DateWrapper>
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
                </DateWrapper>
                <StyledSubParagraph2 small>
                  Status na miesiąc:
                  {institution.attributes.statistics
                    ? " " +
                      institution.attributes.statistics["provider-data"].update
                    : " Brak danych"}
                </StyledSubParagraph2>
              </InnerCard>
              <InnerCard margin={"15px 0 0 0"}>
                <StyledHeading3 as="h4">Najbliższy termin: </StyledHeading3>
                <DateWrapper>
                  <StyledDaysNum
                    time={
                      institution.attributes.dates ? dateDifference : 999999999
                    }
                  >
                    {institution.attributes.dates
                      ? institution.attributes.dates.date
                      : "Brak danych"}
                  </StyledDaysNum>
                </DateWrapper>
                <StyledSubParagraph2 small>
                  Status na dzień:
                  {institution.attributes.dates
                    ? " " + institution.attributes.dates["date-situation-as-at"]
                    : "Brak danych"}
                </StyledSubParagraph2>
              </InnerCard>
            </StyledDateCardsWrapper>
            <StyledBasicInfo margin={"15px 0 0 0"}>
              <div>
                <StyledSubParagraph1>Telefon</StyledSubParagraph1>
                <StyledParagraph3>
                  {institution.attributes.phone}
                </StyledParagraph3>
              </div>
              <div>
                <StyledSubParagraph1>Miejscowość</StyledSubParagraph1>
                <StyledParagraph3>
                  {institution.attributes.locality}
                </StyledParagraph3>
              </div>
              <div>
                <StyledSubParagraph1>Ulica</StyledSubParagraph1>
                <StyledParagraph3>
                  {institution.attributes.address}
                </StyledParagraph3>
              </div>
            </StyledBasicInfo>
            <InnerCard margin={"15px 0 0 0"}>
              <StyledSubParagraph1>
                Nazwa świadczenia określonego przez NFZ
              </StyledSubParagraph1>
              <StyledParagraph3>
                {institution.attributes.benefit}
              </StyledParagraph3>
              <StyledSubParagraph1>
                Nazwa miejsca udzielania świadczeń
              </StyledSubParagraph1>
              <StyledParagraph3>
                {institution.attributes.place}
              </StyledParagraph3>
            </InnerCard>
            {showPage[index] ? (
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
