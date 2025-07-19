import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
const ToolBar = () => {
	return (
		<div>
			<Toolbar
				sx={{
					backgroundColor: "#f5f5f5",
					borderBottom: 1,
					borderColor: "divider",
					display:"flex",
					justifyContent:"space-between"
				}}
			>
				<div className="">
					<a href="#">-</a>
					<a href="#">+</a>
					<a href="#">%</a>
				</div>
				<TextField
					placeholder="Search..."
					variant="outlined"
					size="small"
					sx={{ width: "300px" }}
				/>
				<button>menus</button>
			</Toolbar>
		</div>
	);
};

export default ToolBar;
