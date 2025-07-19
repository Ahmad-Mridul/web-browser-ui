import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToolBar from "./components/ToolBar";
import Home from "./pages/Home";


function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
	const [tabs, setTabs] = React.useState([
		{ label: "Item One", content: "Item One" },
	]);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		if (newValue === tabs.length) {
			handleAddTab();
		} else {
			setValue(newValue);
		}
	};

	const handleAddTab = () => {
		const newIndex = tabs.length;
		setTabs((prev) => [
			...prev,
			{ label: `Item ${newIndex + 1}`, content: `Content for Item ${newIndex + 1}` },
		]);
		setValue(newIndex);
	};

	const handleCloseTab = (indexToClose) => {
		setTabs((prevTabs) => {
			const newTabs = prevTabs.filter((_, i) => i !== indexToClose);
			if (value === indexToClose) {
				setValue(indexToClose === 0 ? 0 : indexToClose - 1);
			} else if (value > indexToClose) {
				setValue(value - 1);
			}
			return newTabs;
		});
	};

	return (
		<Box sx={{ width: "100%" }}>
			{/* Tabs with Close and Add */}
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="tabs with add and close"
					variant="scrollable"
					scrollButtons="auto"
				>
					{tabs.map((tab, index) => (
						<Tab
							key={index}
							label={
								<Box sx={{ display: "flex", alignItems: "center" }}>
									{tab.label}
									<IconButton
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											handleCloseTab(index);
										}}
										sx={{ ml: 1 }}
									>
										<CloseIcon fontSize="small" />
									</IconButton>
								</Box>
							}
						/>
					))}
					<Tab className="text-4xl" label="+" />
				</Tabs>
			</Box>

			{/* Static Navigation Bar */}
			<ToolBar/>

			{/* Tab Panels */}
			{tabs.map((tab, index) => (
				<CustomTabPanel key={index} value={value} index={index}>
					<Home/>
				</CustomTabPanel>
			))}
		</Box>
	);
}
