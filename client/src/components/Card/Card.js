import React from 'react'
import styles from './styles/Card.module.css'
import CardComp from './_Card'


const Card = (props) => {

  const cardDetails = [
    {
      title: "Total Trucks",
      num: "389"
    },
    {
      title: "Total Drivers",
      num: "365"
    },
    {
      title: "Total Successful Shipments",
      num: "25,969"
    },
    {
      title: "Total Failed Shipments",
      num: "15"
    },
    {
      title: "Total Income",
      num: "N546,555.00"
    }
  ]


  return (
    <div className={styles.card_map}>
       {cardDetails.map(cardDetail => (
            <CardComp
              title={cardDetail.title}
              num={cardDetail.num}
            />
      ))}      
      </div>
  )
}

export default Card

  