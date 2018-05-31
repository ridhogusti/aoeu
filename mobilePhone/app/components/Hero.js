import React from 'react';
import { List, ListItem, Body, Text, Thumbnail } from 'native-base';

function Hero({ hero, navigator }) {
  return (
    <ListItem
      onPress={() => navigator.push({
        screen: 'push.HeroView',
        passProps: {
          hero,
        },
      })}
    >
      <Thumbnail
        square
        size={80}
        source={{ uri: hero.imageUri }}
      />
      <Body>
        <Text>{hero.name}</Text>
        <Text note>{hero.title}</Text>
      </Body>
    </ListItem>
  );
}

export default Hero;
