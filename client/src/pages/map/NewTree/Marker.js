import React from 'react';
import { Box, styled } from '@mui/material';
import { Crosshairs } from './Crosshairs';
import { AddButton, TrackingToggle } from './MarkerButtons';
import { TooltipBottom, TooltipTop } from '@/components/Tooltip';

const circleSize = 70;
const outerBorderSize = 2;

const Container = styled(Box)`
  text-align: center;
`;

const OuterBorder = styled('div')`
  border: ${outerBorderSize}px solid white;
  border-radius: 50%;
`;

const OuterCircle = styled('div')(({ theme }) => `
  width: ${circleSize}px;
  height: ${circleSize}px;
  border: 4px solid ${theme.palette.primary.main};
  border-radius: 50%;

  // As soon as the cursor hits the OuterCircle border, we want the InnerCircle color to change.
  // The 44 at the end is a hex alpha value to make the color translucent.
  &:hover > div {
    border-color: ${theme.palette.primary.main}44;
  }

  &:active > div {
    border-color: ${theme.palette.primary.main}66;
  }
`);

const InnerCircle = styled('div')(({ theme }) => `
  width: 100%;
  height: 100%;
  border: 20px solid ${theme.palette.primary.main}22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`);

const Target = styled(Crosshairs)(({ theme }) => `
  width: ${circleSize / 2}px;
  height: ${circleSize / 2}px;
  color: ${theme.palette.primary.main};
`);

const Toolbar = styled(Box)`
  width: 100%;
  margin-top: .5rem;
  display: flex;
  justify-content: space-between;
`;

export function Marker({ tracking, onPlantClick, onTrackingChange }) {
  return (
    <Container>
      <TooltipTop title="Drag to the location for the new tree">
        <OuterBorder>
          <OuterCircle>
            <InnerCircle>
              <Target />
            </InnerCircle>
          </OuterCircle>
        </OuterBorder>
      </TooltipTop>
      <Toolbar>
        <TooltipBottom
          title="Enter the details for the new tree"
        >
          <AddButton
            onClick={onPlantClick}
          />
        </TooltipBottom>
        <TooltipBottom
          title={tracking
            ? 'Stop tracking your current location'
            : 'Make the planting marker follow your current location'}
        >
          <TrackingToggle
            checked={tracking}
            onChange={onTrackingChange}
          />
        </TooltipBottom>
      </Toolbar>
    </Container>
  );
}

// Calculate the offset from the top-left of the marker to the center of the target.  Adding 1px
// seems to align the planted tree with the crosshairs better.
export const markerOffset = (circleSize + 2 * outerBorderSize) / 2 + 1;