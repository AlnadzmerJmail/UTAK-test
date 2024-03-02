import { useState, useEffect } from 'react';

import { MyButton } from './button';
import useFirebase from '../customs';

function Table({ toggleFormHandler, setUpdateData }) {
	const { fetchItems, deleteItem } = useFirebase();

	const [items, setItems] = useState([]);

	useEffect(() => {
		fetchItems('items', (res) => {
			if (res?.error) return alert('Fetch items went error!');

			setItems(res?.data || []);
		});
	}, []);

	const deleteItemHandler = async (id) => {
		const res = await deleteItem(id);
		if (res?.error) alert(res.error);
	};

	return (
		<div className="table--wrapper">
			<header>
				<h1>Restaurant Menu</h1>
				<MyButton
					variant="create"
					icon="create"
					label="Create"
					onClick={toggleFormHandler}
				/>
			</header>
			<table className="table">
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Category</th>
						<th>Variation</th>
						<th>Price</th>
						<th>Cost</th>
						<th>Stock</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{items.map(
						({ id, name, category, variation, price, cost, stock }) => (
							<tr key={id}>
								<td>{name}</td>
								<td>{category}</td>
								<td>{variation}</td>
								<td>{price}</td>
								<td>{cost}</td>
								<td>{stock}</td>
								<td>
									<MyButton
										variant="primary"
										icon="pen"
										onClick={() => {
											toggleFormHandler();
											setUpdateData(items.find((item) => item.id === id));
										}}
									/>
									<MyButton
										variant="danger"
										icon="trash"
										ml={10}
										onClick={() => deleteItemHandler(id)}
									/>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
