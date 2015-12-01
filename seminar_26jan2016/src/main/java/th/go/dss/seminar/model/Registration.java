package th.go.dss.seminar.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="registration")
@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property="id", scope=Registration.class)
public class Registration implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 980545094496447245L;

	@Id
	@GeneratedValue(generator="table", strategy=GenerationType.TABLE)
	@TableGenerator(name = "table", allocationSize = 10)
	private Long id;
	
	
	@OneToOne
	@JoinColumn(name="person_id")
	private Person person;
	
	@Enumerated(EnumType.STRING)
	@Column(name="breakoutRoom")
	private BreakoutMeetingRoom breakoutRoom;
	
	@Column(name="remark")
	private String remark;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="createdTime")
	private Date createdTime;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Person getPerson() {
		return person;
	}
	public void setPerson(Person person) {
		this.person = person;
	}
	public BreakoutMeetingRoom getBreakoutRoom() {
		return breakoutRoom;
	}
	public void setBreakoutRoom(BreakoutMeetingRoom breakoutRoom) {
		this.breakoutRoom = breakoutRoom;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	
	
	
	
	
}
