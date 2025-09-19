import axios from "axios";
import { pool} from "./src/config/database"

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
})();

async function testSignup() {
  try {
    const response = await axios.post(
      "https://localhost:5000",
      {
        fullName: "Grace Adegunle",
        email: "grace@example.com",
        password: "SecurePassword123",
        confirmPassword: "SecurePassword123"
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (err: any) {
    if (err.response) {
      console.error("Error response status:", err.response.status);
      console.error("Error response data:", err.response.data);
    } else {
      console.error("Signup error:", err.message);
    }
  }
}

testSignup();
