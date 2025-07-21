import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const ShortcutModal = ({ onAdd }) => {
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");

	const handleAdd = (e) => {
		e.preventDefault(); // prevent default form submission
		if (!name.trim() || !url.trim()) return;

		const newShortcut = { name, url };
		onAdd(newShortcut);

		// Reset & close modal
		setName("");
		setUrl("");
		document.getElementById("my_modal_5").close();
	};

	return (
		<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
			<form onSubmit={handleAdd}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						p: 3,
						width: 400,
						backgroundColor: "#f9f9f9",
						borderRadius: 2,
						boxShadow: 3,
					}}
				>
					<TextField
						label="Name"
						variant="outlined"
						fullWidth
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						label="URL"
						variant="outlined"
						fullWidth
						required
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>

					<Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
						<Button type="submit" variant="contained" color="primary">
							Add
						</Button>
						<form method="dialog">
							<Button variant="outlined" color="secondary" type="submit">
								Close
							</Button>
						</form>
					</Stack>
				</Box>
			</form>
		</dialog>
	);
};

export default ShortcutModal;
