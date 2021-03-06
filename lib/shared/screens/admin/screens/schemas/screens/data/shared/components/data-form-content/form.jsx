import React, {PropTypes} from 'react';

import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import {Link} from 'react-router';
import ModalDelete from 'components/modal-delete';
import styles from './form.less';
import DataForm from 'components/data-form';

export default class DataSchemaForm extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    schemaEntry: PropTypes.object,
    toggleRemoveConfirm: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    removeConfirm: PropTypes.bool,
    isNew: PropTypes.bool,
    removing: PropTypes.bool
  };

  render () {
    const {schemaEntry, isNew, schemaId} = this.props;

    return (
      <div>
        <ContentHeader>
          <Link
            to={`/admin/schemas/data/${schemaId}`}
            className={styles.back}
          >
            <i className='nc-icon-outline arrows-1_small-triangle-left' />
            <span>Back to list</span>
          </Link>
          {this.renderActions()}
        </ContentHeader>
        <Content>
          <DataForm schemaEntry={schemaEntry} isNew={isNew} />
        </Content>
      </div>
    );
  }

  renderActions () {
    const {isNew, toggleRemoveConfirm} = this.props;

    if (!isNew) {
      return (
        <ContentHeaderActions>
          <ContentNew remove onClick={toggleRemoveConfirm}>
            Remove entry
          </ContentNew>
          {this.renderRemoveConfirm()}
        </ContentHeaderActions>
      );
    }
  }

  renderRemoveConfirm () {
    const {removeConfirm, removeEntry, toggleRemoveConfirm, removing} = this.props;

    if (removeConfirm) {
      return (
        <ModalDelete
          submit={removeEntry}
          cancel={toggleRemoveConfirm}
          loading={removing}
        />
      );
    }
  }
}
