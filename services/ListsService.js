const { Op, sequelize } = require('sequelize');
const { update } = require("../controllers/listsController");
const db = require("../models");

const deleteList = async (listId, callback) => {
	try {
		const oneList = await db.List.findByPk(listId);
		console.log(oneList)
		db.List.decrement({ index: 1 }, { where: { 'boardId': oneList.BoardId, 'index': { [Op.gt]: oneList.index } } });
		await db.List.destroy({ where: { id: listId} });
		return callback(false,{ message: 'Success' });
	}
	catch (error) {
		// Return error message
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
}
const create = async (listTitle, boardId, callback) => {
	try {
		// Create new List
		const newList = await db.List.create({ listTitle: listTitle, BoardId: boardId });
		// create field index
		const count = await db.List.count({ where: { BoardId: boardId } });
		newList.index = count - 1;
		// save index
		await newList.save();
		/*动态功能
		// Get owner board
		const ownerBoard = await boardModel.findById(model.owner);

		// Add newList's id to owner board
		ownerBoard.lists.push(newList.id);

		// Add created activity to owner board activities
		ownerBoard.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added ${newList.title} to this board`,
			color: user.color,
		});
		// Save changes
		ownerBoard.save();*/

		// Return new list
		return callback(false, newList);
	} catch (error) {
		// Return error message
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateListOrder = async (boardId, sourceObjId, sourceIndex, destinationIndex, callback) => {
	try {
		console.log("here" + sourceIndex + " " + destinationIndex);
		if (sourceIndex > destinationIndex) {
			//前面的加1往后挪
			db.List.increment({ index: 1 }, { where: { 'boardId': boardId, 'index': { [Op.between]: [destinationIndex, sourceIndex - 1] } } });
			//目标移动到指定位置
			await db.List.update({
				index: destinationIndex
			}, {
				where: {
					id: sourceObjId
				}
			})
		}
		else if (sourceIndex < destinationIndex) {
			//后面的减一往前挪
			db.List.decrement({ index: 1 }, { where: { 'boardId': boardId, 'index': { [Op.between]: [sourceIndex + 1, destinationIndex] } } });
			//目标移动到指定位置
			await db.List.update({
				index: destinationIndex
			}, {
				where: {
					id: sourceObjId
				}
			})
		}
		return callback(false, { message: 'Success' });
	}
	catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
}
//原列表+在原列表中的index+新列表+在新列表中的index
const updateCardOrder = async (cardId, sourceListId, sourceIndex, destinationListId, destinationIndex, callback) => {
	try {
		if (destinationListId === sourceListId) {
			if (sourceIndex > destinationIndex) {
				db.Card.increment({ index: 1 }, { where: { 'ListId': sourceListId, 'index': { [Op.between]: [destinationIndex, sourceIndex - 1] } } });
				await db.Card.update({
					index: destinationIndex
				}, {
					where: {
						id: cardId
					}
				})
			}
			else if (sourceIndex < destinationIndex) {
				db.Card.decrement({ index: 1 }, { where: { 'ListId': sourceListId, 'index': { [Op.between]: [sourceIndex + 1, destinationIndex] } } });
				await db.Card.update({
					index: destinationIndex
				}, {
					where: {
						id: cardId
					}
				})
			}
		}
		else {
			//原先的列中后面的index向前挪,index>原index，-1
			db.Card.decrement({ index: 1 }, { where: { ListId: sourceListId, 'index': { [Op.gt]: sourceIndex } } });
			//新增的列中后面的index往后挪，index>=新index,+1
			db.Card.increment({ index: 1 }, { where: { ListId: destinationListId, 'index': { [Op.gte]: destinationIndex } } });
			//在新列表增加,把原来的listId更新一下就可
			db.Card.update(
				{
					ListId: destinationListId,
					index: destinationIndex
				}, {
				where: {
					id: cardId
				}
			});
		}
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};
module.exports = {
	updateCardOrder,
	create,
	updateListOrder,
	deleteList
};