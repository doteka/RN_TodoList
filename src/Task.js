"use strict";
exports.__esModule = true;
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var IconButton_1 = require("./IconButton");
var Image_1 = require("./Image");
var react_native_1 = require("react-native");
var theme_1 = require("./theme");
var Input_1 = require("./Input");
var Task = function (_a) {
    var item = _a.item, deleteTask = _a.deleteTask, toggleTask = _a.toggleTask, updateTask = _a.updateTask;
    var _b = react_1.useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = react_1.useState(item.text), text = _c[0], setText = _c[1];
    var _handleUpdateButtonPress = function () {
        setIsEditing(true);
    };
    var _onSubmitEditing = function () {
        if (isEditing) {
            var editedTask = Object.assign({}, item, { text: text });
            setIsEditing(false);
            updateTask(editedTask);
        }
    };
    var _onBlur = function () {
        if (isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    };
    return isEditing ? (<Input_1["default"] value={text} onChangeText={function (text) { return setText(text); }} onSubmitEditing={_onSubmitEditing} onBlur={_onBlur}/>) : (<react_native_1.SafeAreaView style={[Styles.View, theme_1.theme.itemBackground]}>
      <IconButton_1["default"] type={item.completed ? Image_1.images.completed : Image_1.images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
      <react_native_1.Text completed={item.completed} style={[
            Styles.Contents,
            theme_1.theme.text,
            item.completed ? theme_1.theme.done : theme_1.theme.text,
            item.completed ? Styles.line_through : Styles.line_none,
        ]}>
        {item.text}
      </react_native_1.Text>
      {item.completed || (<IconButton_1["default"] type={Image_1.images.edit} onPressOut={_handleUpdateButtonPress}/>)}
      {/* <IconButton type={images.edit} /> */}
      <IconButton_1["default"] type={Image_1.images["delete"]} id={item.id} onPressOut={deleteTask} completed={item.completed}/>
    </react_native_1.SafeAreaView>);
};
var Styles = react_native_1.StyleSheet.create({
    View: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 0
    },
    Contents: {
        flex: 1,
        fontSize: 24
    },
    line_through: {
        textDecorationLine: "line-through"
    },
    line_none: {
        textDecorationLine: "none"
    }
});
Task.proptypes = {
    text: prop_types_1["default"].string.isRequired,
    deleteTask: prop_types_1["default"].func.isRequired,
    toggleTask: prop_types_1["default"].func.isRequired,
    updateTask: prop_types_1["default"].func.isRequired
};
exports["default"] = Task;
