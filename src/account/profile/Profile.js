import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { deleteUser, getBookingsByUserId, getUser } from '../../api/Api'
import Navbar from '../../components/navbar/Navbar'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Table } from 'antd';
const { Meta } = Card;

const Profile = () => {
    const [user , setUser] = useState({
        id: "",
        email: "",
        fullName: "",
        phone: "",
        roles: [{ id: "", name: "" }]
    })

    const [bookings, setBookings] = useState([
        {
            id: "",
            room: { id: "", roomType: "" },
            checkIn: "",
            checkOut: "",
            bookingCode: ""
        }
    ])

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token)
                setUser(userData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId, token)
                setBookings(response)
            } catch (error) {
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }

        fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account?"
        )
        if (confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRole")
                    navigate("/")
                    window.location.reload()
                })
                .catch((error) => {
                    setErrorMessage(error.data)
                })
        }
    }

  return (
    <>
    <Navbar/>
    <div className='container'>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}
            {user ? ( 
            <div>
                <h4 className="card-title text-center">User Information</h4>
                <Card
                style={{
                  width: 700,
                }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title="Profile"
                  description={user.email}
                />
                <p>ID : {user.id} </p>
                <p>Name : {user.fullName}</p>
                <p>Phone : {user.phone}</p>
                <p>Email : {user.email}</p>
                <p>Roles :{user.roles.map((role) => (
                    <div key={role.id} className="card-text">
                        {role.name}
                    </div>
                ))} </p>
              </Card>
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    <h4 className="card-title text-center">Booking History</h4>

                            {bookings.length > 0 ? (
                                <Table className="table table-bordered table-hover shadow">
                                    <thead>
                                        <tr>
                                            <th scope="col">Booking ID</th>
                                            <th scope="col">Room ID</th>
                                            <th scope="col">Room Type</th>
                                            <th scope="col">Check In Date</th>
                                            <th scope="col">Check Out Date</th>
                                            <th scope="col">Confirmation Code</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td>{booking.id}</td>
                                                <td>{booking.room.id}</td>
                                                <td>{booking.room.roomType}</td>
                                                <td>
                                                    {moment(booking.checkIn).subtract(1, "month").format("MMM Do, YYYY")}
                                                </td>
                                                <td>
                                                    {moment(booking.checkOut)
                                                        .subtract(1, "month")
                                                        .format("MMM Do, YYYY")}
                                                </td>
                                                <td>{booking.bookingCode}</td>
                                                <td className="text-success">On-going</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>You have not made any bookings yet.</p>
                            )}

                            <div className="d-flex justify-content-center">
                                <div className="mx-2">
                                    <Button type='primary' className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                                        Delete account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
            ) : (
                <p>Loading user data...</p>
            )}
    </div>
    </>
  )
}

export default Profile