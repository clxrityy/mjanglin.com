# [sleepgraph](https://sleepgraph.mjanglin.com) <img src="/public/apple-touch-icon.png" width="22px" height="22px" />

**Calculate and visualize your sleep patterns.**

---

- Authenticate with [clerk](https://clerk.com/).
    - Allows access to the `/dashboard` route (*`/dashboard/{user_id}`*)
- Add new data
    ![new record page](https://i.gyazo.com/b7432558bb257a047501f8c50d5598c4.gif)
    - After data is successfully added, the user is redirected to the `/data` route
    > You can't enter data for days that already have a record or for days that haven't happened yet.
- Visualize the data in charts/graphs utilizing [recharts](https://recharts.org/en-US).

## Charts / Graphs

#### Weekday average
![weekday average](https://i.gyazo.com/33df9b6f48ce6ac9f4e3d39c35f5b6a5.png)


