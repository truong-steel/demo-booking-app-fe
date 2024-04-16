import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080'
})
// Get Header from LocalStorage 

export const getHeader = () => {
    const token = localStorage.getItem('token')
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
    }
}

export const getHearder2 = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
}

// Homestay APIs

export async function getAllHomestays() {
    try {
        const res = await api.get('/api/homestays')
        return res.data
    } catch (error) {
        throw new Error('Error fetching homestays')
    }
}

// Room APIs

export async function getAllRooms() {
    try {
        const res = await api.get('/api/rooms')
        return res.data
    } catch (error) {
        throw new Error('Error fetching homestays')
    }
}

export async function addNewRoom ( image , roomType , roomPrice ) {
    // const homestayId = req.params.homestayId
    const formData = new FormData()
    formData.append('image' , image)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const res = await api.post("/rooms/add/new-room", formData, {
        headers: getHearder2()
    } )
    if (res.status === 201 || res.status === 200) {
        return true
    } else {
        return false
    }
}

export async function getRoomType() {
    try {
        const res = await api.get("/rooms/room/types")
        return res.data
    } catch (error) {
        throw new Error("Error Fetching Room Types")
    }
}

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}` , {
            headers: getHearder2()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("image", roomData.image)

    const res = await api.put(`/rooms/update/${roomId}`, formData , {
        headers: getHearder2()
    })
    return res
}

// Account APIs 

export async function signIn(login) {
    try {
        const response = await api.post('/auth/login', login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function signUp(dataReq) {
    try {
        const response = await api.post('/auth/register-customer', dataReq)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error ${error.message}`)
        }
    }
}

export async function managerSignUp(dataReq) {
    try {
        const response = await api.post('/auth/register-manager', dataReq)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error ${error.message}`)
        }
    }
}

export async function adminSignUp(dataReq) {
    try {
        const response = await api.post('/auth/register-admin', dataReq)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error ${error.message}`)
        }
    }
}


export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// Booking APIs 

// Booking Room

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings")
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings ${error.message}`)
    }
}