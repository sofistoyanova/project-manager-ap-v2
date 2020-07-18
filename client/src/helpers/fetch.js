import axios from 'axios'
const url = 'http://localhost:5001/api/'
const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
}

export const getMethod = async(route) => {
    try {
        const res = await axios.get(route)
        return res
    } catch(err) {
        return err
    }
}

export const postMethod = async(formData, route) => {
    try {
        const res = await axios.post(route, formData, headers)
        return res
    } catch(err) {
        return err
    }
}

export const postMethod1 = async (formData, route) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }

    try {
        const response = await fetch(url + route, requestOptions)
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}

export const getMethod1 = async (route) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(url + route, requestOptions)
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}

export const patchMethod = async (route, requestBody) => {
    const requestOptions = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(url + route, requestOptions)
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}

export const deleteMethod = async (route) => {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(url + route, requestOptions)
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}