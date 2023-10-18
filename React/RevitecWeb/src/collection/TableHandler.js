import React, { Component } from 'react';
import { swalertConfirm } from '../utils/notifications';
import Loading from './icons/Loading';

/**
 * Handles some advanced table behaviour.
 * Props:
 * - function onUpdate(FormData filter): object data
 * - function onDelete(int id)
 * - function onAction(string action, int id)
 * - elementText: 
 * Children: Additional props data, onFilter, formId, formOpen, onNew, onEdit, onDelete, onAction and onFormClose are passed to children.
 */
export default class TableHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            formOpen: false,
            formId: 0
        };
        this.setData = this.setData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleFormNew = this.handleFormNew.bind(this);
        this.handleFormEdit = this.handleFormEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
    }

    componentDidMount() {
        this.updateData();
    }

    async updateData(filter) {
        this.setData(await this.props.onUpdate(filter));
    }

    setData(data) {
        this.setState({ data: data, isLoading: data == null });
    }

    switchForm(boolean, id = 0) {
        this.setState({ formOpen: boolean, formId: boolean ? id : 0 });
    }

    getRow(event) {
        return event.currentTarget.closest("[rowid]");
    }

    handleFormNew(event) {
        this.switchForm(true);
    }

    handleFormEdit(event) {
        const id = this.getRow(event).getAttribute("rowid");
        this.switchForm(true, id);
    }

    handleFormClose() {
        this.switchForm(false);
        this.updateData();
    }

    async handleDelete(event) {
        const row = this.getRow(event);
        const id = row.getAttribute("rowid");
        const name = row.getAttribute("rowname");
        const ok = await swalertConfirm(
            "¿Eliminar " + this.props.elementText + "?",
            "Confirma para eliminar " + this.props.elementText + " '" + name + "'.");
        if (ok) {
            await this.props.onDelete(id);
            await this.updateData();
        }
    }

    async handleAction(event) {
        const elem = event.currentTarget;
        const action = elem.getAttribute("action");
        const actionName = elem.getAttribute("title");
        const row = elem.closest("[rowid]");
        const id = row.getAttribute("rowid");
        const name = row.getAttribute("rowname");
        const ok = await swalertConfirm(
            "¿" + actionName + " " + this.props.elementText + "?",
            this.props.actionDescriptor ? this.props.actionDescriptor(actionName, id) :
                "Confirma para " + actionName.toLowerCase() + " " + this.props.elementText + " '" + name + "'.");
        if (ok) {
            await this.props.onAction(action, id);
            await this.updateData();
        }
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    data: this.state.data,
                    onFilter: this.updateData,
                    formId: this.state.formId,
                    formOpen: this.state.formOpen,
                    onNew: this.handleFormNew,
                    onEdit: this.handleFormEdit,
                    onDelete: this.handleDelete,
                    onAction: this.handleAction,
                    onFormClose: this.handleFormClose
                });
            }
            return child;
        });
        return this.state.isLoading ? <Loading /> : children;
    }
}
