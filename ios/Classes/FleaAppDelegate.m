//
//  FleaAppDelegate.m
//  Flea
//
//  Created by Michael Jacobs on 11/18/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import "FleaAppDelegate.h"
#import "EAGLView.h"

@implementation FleaAppDelegate

@synthesize window;
@synthesize glView;

- (void) applicationDidFinishLaunching:(UIApplication *)application
{
	[glView startAnimation];
}

- (void) applicationWillResignActive:(UIApplication *)application
{
	[glView stopAnimation];
}

- (void) applicationDidBecomeActive:(UIApplication *)application
{
	[glView startAnimation];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
	[glView stopAnimation];
}

- (void) dealloc
{
	[window release];
	[glView release];
	
	[super dealloc];
}

@end
