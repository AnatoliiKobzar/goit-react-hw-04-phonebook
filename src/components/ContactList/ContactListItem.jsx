import { useState } from 'react';
import { Button } from 'components/ContactForm/ContactForm.styled';
import {
  ButtonsWrap,
  Contact,
  Info,
  LabelInfo,
  Wrap,
} from './ContactList.styled';
import PropTypes from 'prop-types';
import { SlUserUnfollow, SlPhone, SlSocialGithub } from 'react-icons/sl';
import { FiEdit3, FiCheckCircle } from 'react-icons/fi';

export const ContactListItem = ({ contact, onDelete, editContact }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditContact = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
      editContact({
        id: contact.id,
        name,
        number,
      });
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  return (
    <Contact key={contact.id}>
      <Wrap>
        {isEdit ? (
          <LabelInfo>
            <SlSocialGithub size="20px" />
            <input
              name="name"
              onChange={handleChange}
              value={name}
              type="text"
            />
          </LabelInfo>
        ) : (
          <Info>
            <SlSocialGithub size="20px" />
            {contact.name}:
          </Info>
        )}
        {isEdit ? (
          <LabelInfo>
            <SlPhone size="20px" />
            <input
              name="number"
              onChange={handleChange}
              value={number}
              type="text"
            />
          </LabelInfo>
        ) : (
          <Info>
            <SlPhone size="20px" />
            {contact.number}
          </Info>
        )}
      </Wrap>
      <ButtonsWrap>
        <Button
          type="button"
          onClick={() => {
            onDelete(contact.id);
          }}
        >
          <SlUserUnfollow size="18px" />
        </Button>
        <Button type="button" onClick={handleEditContact}>
          {isEdit ? <FiCheckCircle size="18px" /> : <FiEdit3 size="18px" />}
        </Button>
      </ButtonsWrap>
    </Contact>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
};
