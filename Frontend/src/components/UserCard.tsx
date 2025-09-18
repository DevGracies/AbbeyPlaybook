import { motion } from "framer-motion";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

export default function UserCard({ user }: { user: any }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
      <Card sx={{ borderRadius: "1.2rem", boxShadow: 4 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 50, height: 50 }} />
          <Typography variant="h6">{user.name}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
