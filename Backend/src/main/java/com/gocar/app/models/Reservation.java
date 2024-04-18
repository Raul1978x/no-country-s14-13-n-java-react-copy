package com.gocar.app.models;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity
@Table(name ="reservation")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
@ToString
@Builder

public class Reservation {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 @ManyToOne
	 @JoinColumn(name = "vehicle_id")
	 private Vehicle vehicle;
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	 private User user;
	 private Double iva;
	 private Double administrativeFee;
	 private Double subtotal;
	 private Double total;
	 @ManyToOne
	 @JoinColumn(name= "insurance_id")
	 private Insurance insurance;
	 private Boolean softDelete  = Boolean.FALSE;
	 @OneToOne(cascade = CascadeType.ALL)
	 @JoinColumn(name = "reservation_dates_id", referencedColumnName = "id")
	 private ReservationDates reservationDates;

}
